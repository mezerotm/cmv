/*
 * api.js
 * 
 * This file contains the functions that interact with the City SDK (US Census). 
 * 
 * In this file you will find:
 * 
 * apiCallBack : This is callback function that responds to the responses from the 
 * basic api calls made to the City SDK.
 *
 * geoCAllBack : This is the callback function that respondes to the responses 
 * from the geographical based api of the City SDK.
 * 
 * retrieveData : This function is called by the submit button to connect with the City
 * SDK and obtain the data.
 */

// flag for debug output
// true: debug output on
// false: debug output off
var DEBUG = true;
var num_polygons = 0;
var all_polygons = [];
var is_first_apirequest = false;
var is_first_georequest  = false;

// Enable module with the API key
var censusAPIKey = "c83e06ec87c35c0d3ffb0f6d7640afbf52b7071c";
var sdk = new CitySdk(); //Create the CitySDK Instance
var census = new CensusModule(censusAPIKey); //Create an instance of the module
var censusVariables = new CensusVariablesMap(); // Create a mapping object for the census variables.

//This variable is a global variable and will be used in two functions to use to hold what the user 
//enters to look at, i.e. income, population. I set it equal to 0 just so that it is not undefined. 
var variable = 0;

//Creating an object to be used to convert the variable names, i.e. income, population to their key that 
//the SDK uses like B19013_001E. 
convertionObject = new CensusVariablesMap();

//Here is where I set up and make my call to google maps API. 
/*function init_map() {
      var var_location = new google.maps.LatLng(33.895,-84.210);

      var var_mapoptions = {
        center:var_location,
        zoom: 11
      }


      var map1 = new google.maps.Map(document.getElementById("map1"), var_mapoptions);

      // map1.data.setStyle({
      //     fillColor: 'blue'
      //   });

    //MAP TWO 
    var var_location = new google.maps.LatLng(33.895,-84.210);

    var var_mapoptions = {
        center:var_location,
        zoom: 11
      };

      var map1 = new google.maps.Map(document.getElementById("map2"), var_mapoptions);
}

google.maps.event.addDomListener(window, 'load', init_map);*/

/*
 * geoCallBack : This is the callback function that responds to the responses 
 * from the geographical based api of the City SDK.
 *        response: The JSON response from the City SDK
 */
geoCallBack = function (response) {
    num_polygons_now = 0;
    //console.log("geocallback");
    //console.log("state: " + response.readyState + " status: " + response.status);
    if (response && is_first_georequest) {


        var dataResults = JSON.stringify(response, null, 4);
        var resultsObject = JSON.parse(dataResults);
        //processTractData(resultsObject);
        // output geo data to an output panel on the UI
        if (DEBUG) {
            
            //console.log(response.features.length);
            //console.log(JSON.stringify(response, null, 4));
        }

         var map = new google.maps.Map(document.getElementById('map' + document.getElementById("active_map_holder").value), {
            zoom: 10,
            center: {lat: 33.895, lng: -84.210},
            mapTypeId: 'terrain'
        });

        //This is the variable being converted from, something like income, to the SKD key of B19013_001E
        variableConverted = convertionObject.getVariableFromValue(variable);

       // Step 1: Determines the array of colors
       // QUESTION: We may need more colors or the number of colors may be dependent on the range from min to max?
       var colors = ["red", "pink", "yellow", "blue", "green" ];
       
       // Step 2: Determine the range
       // This function returns an object (see function below)
       var minMaxValue = getMinMaxValue(response.features);
       
       // Step 3: Create the intervals
       // This returns an array of objects (see function below)
       var intervals = generateIntervals(minMaxValue, colors.length);
       
       // Step 4: Assign colors to tract
       /*Creating an array to hold the median household income values. (I know that we will have to modify the 
        code for the user to search for any variable.)  */
       var medianHouseIncome = [];
       
       //I loop through all of the objects, in this case all 113 of them, pulling the median house hold income data 
       //then pushing that into the array created above.
        //console.log("response length: " + response.features.length);
       for (var i = 0; i < response.features.length; i++){
          var dataPoint = response.features[i].properties[variableConverted];
          
          if (dataPoint >= intervals[0].lower && dataPoint < intervals[0].upper){
                colorValue = colors[0];
          }else if (dataPoint >= intervals[1].lower && dataPoint < intervals[1].upper){
                colorValue = colors[1];
          }else if (dataPoint >= intervals[2].lower && dataPoint < intervals[2].upper){
                colorValue = colors[2]
          }else if (dataPoint >= intervals[3].lower && dataPoint < intervals[3].upper){
                colorValue = colors[3]
          }else{
                colorValue = colors[4]
          }

          medianHouseIncome.push({value: dataPoint, color: colorValue});
       }

        //clear out all shapes previously on the mapE
        for(var i = all_polygons.length; i > 0; i--)
        {
            if(all_polygons[i] != null) all_polygons[i].setMap(null);
            all_polygons.pop();
        }

       //console.log(medianHouseIncome[0]);
        console.log("starting loop - drawing");
       for (var tract = 0; tract < response.features.length; tract++) {
       
            var Coords = [];
       
            for (var i = 0; i < response.features[tract].geometry.coordinates[0].length; i++){
                if (i % 20 === 1) {
                    Coords.push({lat: response.features[tract].geometry.coordinates[0][i][1], lng: response.features[tract].geometry.coordinates[0][i][0]});
                }
       
                var pickColor = Math.round((Math.random() * 10)) % colors.length;
                var polyShape = new google.maps.Polygon({
                    map: map,
                    paths: Coords,
                    //strokeColor: colors[pickColor], //medianHouseIncome[tract].color,
                    strokeOpacity: 0.01,
                    strokeWeight: 2,
                    fillColor:  medianHouseIncome[tract].color, //colors[pickColor]
                    fillOpacity: 0.01
                });
                //polyShape.setMap(map);
                num_polygons++;
                num_polygons_now++;
                all_polygons.push(polyShape);

            }
           //console.log( "tract # " + tract + ": - " + all_polygons.length);
        }
        console.log("ending loop - number of polygons: " + num_polygons_now);

       /////////////////// MAP TWO WORK HERE DO NOT NEED TO DUPLICATE CODE BELOW HERE. /////////////////////
       /* var map = new google.maps.Map(document.getElementById('map2'), {
            zoom: 8,
            center: {lat: 33.895, lng: -84.210},
            mapTypeId: 'terrain'
        });
       
       var colors = ["red", "green", "blue"];
       
       for (var tract = 0; tract < response.features.length; tract++) {
       
            var Coords = [];
       
            for (var i = 0; i < response.features[tract].geometry.coordinates[0].length; i++){
                if (i % 20 === 1) {
                    Coords.push({lat: response.features[tract].geometry.coordinates[0][i][1], lng: response.features[tract].geometry.coordinates[0][i][0]});
                }
       
                var pickColor = Math.round((Math.random() * 10)) % colors.length;
                var polyShape = new google.maps.Polygon({
                    paths: Coords,
                    strokeColor: colors[pickColor],
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: colors[pickColor],
                    fillOpacity: 0.35
                });
                polyShape.setMap(map);

                 var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                  title: 'Hello World!'
              });      
            }
        }*/
       
    } else if(!is_first_georequest)
    {
        console.log("Duplicate callback - geo");
    }
    else {
        console.log("Error: geoCallBack did not get a valid response");
        return false;
    }
    is_first_georequest = false;
};


/*
 * dataCallBack : This is the callback function that responds to the responses 
 * from the census data based api of the City SDK.
 *        response: The JSON response from the City SDK
 */
function dataCallBack(response) {
   if (response && is_first_apirequest) {
       var dataResults = JSON.stringify(response, null, 4);
       var resultsObject = JSON.parse(dataResults);
    
        //DEBUG && console.log(resultsObject.data);
    } else if(!is_first_apirequest)
   {
       console.log("Duplicate callback - api");
   }
    else {
        console.log("Error: dataCallBack did not get a valid response");
        return false;
    }

    is_first_apirequest = false;
    
   // processTractData(resultsObject);
}


    
/*
 * retrieveData : This function is called by the submit button to connect with the City
 * SDK and obtain the data.
 */
 
function retrieveData(){
    is_first_apirequest = true;
    is_first_georequest = true;
 
    // get checkboxes from the web page
    var allCheckBoxes = document.getElementsByName("censusVarz");
    var request = {}; // empty census data request
    
    
    // configure the census data request
    request.level = "county";
    request.zip = "30043";
    request.api = "acs5";
    request.year = "2014";
    request.state = "GA";
    request.sublevel = true;
   
    var checkedVariables = new Array();   // array to hold checked variables
    var numElems = allCheckBoxes.length;  // determines the number of checkboxes
    var foundChecked = false;             // flag for at least one checked box
    
    // This loop processes each checkbox and determines which boxes have been
    // checked. The checked boxes are added to the array of checked variables
    for (var i = 0;i < numElems; i++) {
        if ( allCheckBoxes[i].checked ) {
           foundChecked = true;
           checkedVariables.push(allCheckBoxes[i].value);
        }
    }

    // fill the census data request with the variables selected by the user
    if (foundChecked)
        request.variables = checkedVariables;
    else // default vars
        request.variables = ["population", "income"];


      variable = request.variables[0];

    //checkLoading();

    // This request is used to get geographical data for D3
    //console.log("georequesting");
    census.geoRequest(request, geoCallBack);

    // This request is used to get the data to correlate with the Geo location data.
    //console.log("apirequesting");
    census.apiRequest(request, dataCallBack);
}

function checkLoading() {
    if (census.SUPPLEMENTAL_REQUESTS_IN_FLIGHT === 0) {
        jQuery(".loading-icon-initialstate").hide();
        return;
    } else if (census.SUPPLEMENTAL_REQUESTS_IN_FLIGHT > 0) {
        window.setTimeout(checkLoading, 1500);
    }
}


function processTractData(resultsDataObject) {
    
    if (resultsDataObject) {
        var numTracts = resultsDataObject.features.length;

        for (var tract = 0; tract < numTracts; tract++) {
            DEBUG && console.log(resultsDataObject.features[tract].properties.TRACT);

            var numStats = resultsDataObject.totals.length;
            for (var aStat in resultsDataObject.totals) {
                if (censusVariables.getVariableFromKey(aStat) !== "Undefined") {
                    DEBUG && console.log(censusVariables.getVariableFromKey(aStat) + " : " + resultsDataObject.totals[aStat]);
                }
            }
        }
    }
}


//Sort the medianhousehold income array, find lowest and highest value 
//push into object
function getMinMaxValue(featuresArray) {
    
    //Setting a highest and lowest variables to use as to measure all other variables against.
    var maxVal, minVal;

    //Creating an array to hold all of the median household income variables.
    medianhousehold = [];
    //Use this for loop to push the values into the array.
    for (var i = 0; i < featuresArray.length ; i++){
      var points = featuresArray[i].properties[variableConverted];
      medianhousehold.push(points);
    }

    maxVal = Math.max.apply(null, medianhousehold);
    minVal = Math.min.apply(null, medianhousehold);

    //Setting up an object to return the minimum and maximum values. 
    values = [];
    values.push({ minimum: minVal, maximum: maxVal });

    //Will be returning an object that holds the minimum and maximum values.   
    return values; 
}


function generateIntervals(minMaxValue, numColors) {

    /* the intervals array is an array of objects with the lower/upper bound of the intervals
     * where n = numColors - 1
     *   intervals[0] = {lower: low0, upper: upp0}
     *   intervals[1] = {lower: low1, upper: upp1}
     *   ... 
     *   intervals[n] = {lower: lown, upper: uppn}
     */

    //An array to hold the array of objects for the lower and upper bounds. 
    var intervals = [];

    //Setting out the variables for the max and min values.
    var max = minMaxValue[0].maximum;
    var min = minMaxValue[0].minimum;

    //Calculating the entire length from the max and min values.
    var length = max - min;
    //Determining the interval value
    var intervalValue = length / numColors;
    //Using a for loop to push the lower/upper bounds into the intervals array.
    for (var i = 0; i < numColors; i++){
      intervals.push({ lower: min, upper: min + intervalValue })
      min = min + intervalValue;
    }
    
    return intervals;

}
