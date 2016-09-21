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

// Enable module with the API key
var censusAPIKey = "c83e06ec87c35c0d3ffb0f6d7640afbf52b7071c";
var sdk = new CitySdk(); //Create the CitySDK Instance
var census = new CensusModule(censusAPIKey); //Create an instance of the module
var censusVariables = new CensusVariablesMap(); // Create a mapping object for the census variables.

//Here is where I set up and make my call to google maps API. 
function init_map() {
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

google.maps.event.addDomListener(window, 'load', init_map);


/*
 * geoCallBack : This is the callback function that responds to the responses 
 * from the geographical based api of the City SDK.
 *        response: The JSON response from the City SDK
 */
geoCallBack = function(response) {
    if (response) {

        var dataResults = JSON.stringify(response, null, 4);
        var resultsObject = JSON.parse(dataResults);
        processTractData(resultsObject);
        // output geo data to an output panel on the UI
        if (DEBUG) {
            
            console.log(response.features.length);
            console.log(JSON.stringify(response, null, 4));
        }

       
         var map = new google.maps.Map(document.getElementById('map1'), {
            zoom: 8,
            center: {lat: 33.895, lng: -84.210},
            mapTypeId: 'terrain'
        });
        
        
        /* Steps for gradient:
         * 
         * 1. Determine the array of colors to use with a size of num_colors
         * 2. Determine the range of values: min to max
         * 3. Divide the range into num_colors intervals within the min to max range
         * 4. Assign the colors to the tracts
         * 5. Draw the tracts with the assigned colors
         */
        
       
       // Step 1: Determines the array of colors
       // QUESTION: We may need more colors or the number of colors may be dependent on the range from min to max?
       var colors = ["red", "green", "blue", "yellow", "pink"];
       
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
       for (var i = 0; i < response.features.length; i++){
          var dataPoint = response.features[i].properties.B19013_001E;
          
          /** Loop over the intervals and use an if-stmt to compare the dataPoint to the lower and upper bounds for each interval
           *  until there is a match. When there is a match, then the index of the matching interval is the colorValue
           */
          var colorValue = 0;
          for (var cuurentInterval = 0; currentInterval < intervals.length; currentInterval++) {
              colorValue = colors[currentInterval];
          }

          medianHouseIncome.push({value: dataPoint, color: colorValue});
       }

       /* Now the above for loop was simply a proof of concept. I thought I could take lne 93, 
       place it into the for loops below and then shade the polygons a certain color. However, that does not work. 
       I believe that my idea is 'somewhat' sound, so I am trying to think of a better way to attack the problem. 
       */

       
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
            }
        }
       
        var map = new google.maps.Map(document.getElementById('map2'), {
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
            }
        }
       
    } else {
        console.log("Error: geoCallBack did not get a valid response");
        return false;
    }
};


/*
 * dataCallBack : This is the callback function that responds to the responses 
 * from the census data based api of the City SDK.
 *        response: The JSON response from the City SDK
 */
function dataCallBack(response) {
   if (response) {  
       var dataResults = JSON.stringify(response, null, 4);
       var resultsObject = JSON.parse(dataResults);
    
        DEBUG && console.log(resultsObject.data);
    } else {
        console.log("Error: dataCallBack did not get a valid response");
        return false;
    }
    
   // processTractData(resultsObject);
}


    
/*
 * retrieveData : This function is called by the submit button to connect with the City
 * SDK and obtain the data.
 */
 
function retrieveData(){
 
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
    
  //  checkLoading();

    // This request is used to get geographical data for D3
    census.geoRequest(request, geoCallBack);

    // This request is used to get the data to correlate with the Geo location data.
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


function getMinMaxValue(featuresArray) {
    var minVal, maxVal;
    
    
    return {minimum: minVal, maximum: maxVal}
}


function generateIntervals(minMaxValue, numColors) {
    var intervals = [];
    
    /* the intervals array is an array of objects with the lower/upper bound of the intervals
     * where n = numColors - 1
     *   intervals[0] = {lower: low0, upper: upp0}
     *   intervals[1] = {lower: low1, upper: upp1}
     *   ... 
     *   intervals[n] = {lower: lown, upper: uppn}
     */
    
    return intervals;
}