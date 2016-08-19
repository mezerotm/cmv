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
//Here is where I set up and make my call to google maps API. 
function init_map() {
      var var_location = new google.maps.LatLng(33.957,-84.282);

      var var_mapoptions = {
        center:var_location,
        zoom: 11
      }

      var map1 = new google.maps.Map(document.getElementById("map1"), var_mapoptions);

      map1.data.setStyle({
          fillColor: 'blue'
        });
    }

    google.maps.event.addDomListener(window, 'load', init_map);



/*
 * apiCallBack : This is callback function that responds to the responses from the 
 * basic api calls made to the City SDK.
 *       response: The JSON response from the City SDK
 */
apiCallBack = function (response) {
    
    // echo results for debugging purposes
    if (DEBUG)
        console.log(JSON.stringify(response, null, 4));
    
    // process the api callback response
    
    //Outputs the raw JSON text-full data
    if (DEBUG)
        jQuery("#data").text(JSON.stringify(response, null, 4));
};


/*
 * geoCAllBack : This is the callback function that respondes to the responses 
 * from the geographical based api of the City SDK.
 *        response: The JSON response from the City SDK
 */
geoCallBack = function(response) {
    
    // output geo data to an output panel on the UI
    if (DEBUG) {
        var resultsArea = document.getElementById("mySidenav3");
        var theResultsContent = document.createElement("p");
        
        theResultsContent.appendChild(document.createTextNode(JSON.stringify(response, null, 4)));

        //This line I am using to actually look for the coordinate data. 
        //The below line gets me all of the coordinate points:
        console.log(response.features[0].geometry.coordinates[0]);
        //It will pull back with two objects which contain the information that I need. 
        //This line below will get me the coordinate location at index 0: 
        console.log(response.features[0].geometry.coordinates[0][0]);
        //This will get me the array at index 1:
        console.log(response.features[0].geometry.coordinates[0][1]);

        //Array to hold all of the coordinates
        // arrayOfCoords = [];
        //Creating a variable to hold the coordinates
        // var coord = response.features[0].geometry.coordinates[0][0];
        //pushing the coordinates into the array:
        // arrayOfCoords.push(coord);
        //Console.logging the results to see what I got.
        // console.log(arrayOfCoords[0]);



        resultsArea.appendChild(theResultsContent);
        // map1.data.addGeoJson(geojson);
    }
};
    
/*
 * retrieveData : This function is called by the submit button to connect with the City
 * SDK and obtain the data.
 */
function retrieveData(){
 
    // get checkboxes from the web page
    var allCheckBoxes = document.getElementsByName("censusVarz");
    var request = {}; // empty census data request
    
    
    // configure the census data request
    request.level = "state";
    request.zip = "30519";
    request.api = "acs5";
    request.year = "2014";
    //request.state = "GA";
    //request.sublevel = true;
   
    var checkedVariables = new Array();   // array to hold checked variables
    var numElems = allCheckBoxes.length;  // determines the number of checkboxes
    console.log(numElems);
    var foundChecked = false;             // flag for at least one checked box

    
    // This loop processes each checkbox and determines which boxes have been
    // checked. The checked boxes are added to the array of checked variables
    for (var i = 0;i < numElems; i++) {
        if ( allCheckBoxes[i].checked ) {
           foundChecked = true;
           checkedVariables.push(allCheckBoxes[i].value);
           console.log(checkedVariables);
        }
    }

    // fill the census data request with the variables selected by the user
    if (foundChecked)
        request.variables = checkedVariables;
    else // default vars
        request.variables = ["population", "income"];

    // The request to gather the actual data.
    // We may not need this anymore
    // census.apiRequest(request, apiCallBack);   
  
    // This request is used to get geographical data for D3
    census.geoRequest(request, geoCallBack);
}



