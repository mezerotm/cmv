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
 * data : This function is called by the submit button to connect with the City
 * SDK and obtain the data.
 */

// flag for debug output
// true: debug output on
// false: debug output off
var DEBUG = true; 

//Enable module with the API key
var censusAPIKey = "c83e06ec87c35c0d3ffb0f6d7640afbf52b7071c";
var sdk = new CitySdk(); //Create the CitySDK Instance
var census = new CensusModule(censusAPIKey); //Create an instance of the module



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
        resultsArea.appendChild(theResultsContent);
    }
};
    
/*
 * data : This function is called by the submit button to connect with the City
 * SDK and obtain the data.
 */
function data(){
 
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
    
    // This loop processes each checkbox and determines which boxes have been
    // checked. The checked boxes are added to the array of checked variables
    for (var i = 0;i < numElems; i++) {
        if ( allCheckBoxes[i].checked ) {
           checkedVariables.push(allCheckBoxes[i].value);
        }
    }

    // fill the census data request with the variables selected by the user
    if (request.variables.length > 0)
        request.variables = checkedVariables;
    else // default vars
        request.variables = ["population", "income"];
    


    // The request to gather the actual data.
    // We may not need this anymore
    // census.apiRequest(request, apiCallBack);   
  
    // This request is used to get geographical data for D3
    census.geoRequest(request, geoCallBack);
}

/////////////  Sliding effect 

$("#menu").click(function() {
  $("#toggle").slideToggle(550);
});

////////// Google Maps ////////////////

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34.1207, lng: -84.0044},
    zoom: 10,
    scrollwheel: false
    });
}