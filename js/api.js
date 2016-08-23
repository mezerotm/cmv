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
      var var_location = new google.maps.LatLng(33.901,-85.386);

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

        resultsArea.appendChild(theResultsContent);

        //Working on building coorindate array => Work is all below. 

        //The below line gets me all of the coordinate points:
        //console.log(response.features[0].geometry.coordinates[0]);
        //It will pull back with two objects which contain the information that I need. 
        //This line below will get me the coordinate location at index 0: 
        //console.log(response.features[0].geometry.coordinates[0][0]);
        //This will get me the array at index 1:
        // console.log(response.features[0].geometry.coordinates[0][1]);

        //Array to hold all of the coordinates that will be used for the lines of the polygon's path.
        arrayOfCoords = []; 

        /* For loop to go through all of the coordinates. There are a total of 30148 points.
           I would also say that I think that I could take the for loop below and 
           simply replace it with this one. I have two for loops that are basically doing the same thing.
           The first one builds an array of all of the coordinates. The second one labels those 
           coordinates lat and long. I think I could do this with only using the second for loop and 
           getting rid of the first. */
        for (var i = 0; i < 30149; i++){
            //Creating a variable to hold the coordinates
            var coord = response.features[0].geometry.coordinates[0][i];
            //pushing the coordinates into the array:
            arrayOfCoords.push(coord);
        }
        //Console.logging the results to see what I got.
        //console.log(arrayOfCoords);

        //This line will give me the single lat coordinate or if I did 1 in the third post it would be long.
        //alert(response.features[0].geometry.coordinates[0][0][0])

        //I am working on building an array that will accept the data for the construction of the polygon.

        var Coords = []
        //To push into the Coords array, use: 
        // Coords.push({lat: 1, lng: 2})
        //This will get the correct coords pushed into the Coords array. 
        // Coords.push({lat: response.features[0].geometry.coordinates[0][0][1], lng: response.features[0].geometry.coordinates[0][0][0]})
        // console.log(Coords)

        for (var i = 0; i < 30149; i++){
            Coords.push({lat: response.features[0].geometry.coordinates[0][i][1], lng: response.features[0].geometry.coordinates[0][i][0]})
        }

        //console.log(Coords)

        //This gets me the specific information at one spot: 
        // console.log(Coords[1].lat);

         // In order to proceede, I believe that I need to convert my arrayOfCoords array to 
         //    lat and long coordinates. It may even have to be an object that appears to look 
         //    something like this:

            // var triangleCoords = [
            //   {lat: 33.965, lng: -84.085},
            //   {lat: 33.949, lng: -84.049},
            //   {lat: 33.977, lng: -84.039},
            //   {lat: 33.983, lng: -84.074}
            // ];
        // Once that is done, it can be passed in below under the 'paths:' area. 

        //At this point the coordinates will be placed on the map. 
        var map = new google.maps.Map(document.getElementById('map1'), {
            zoom: 8,
            center: {lat: 33.901, lng: -85.386},
            mapTypeId: 'terrain'
        });

        //Construct the polygon.
        var polyShape = new google.maps.Polygon({
        paths: Coords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
        });
        polyShape.setMap(map);      
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
};



