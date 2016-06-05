
// Enable module with the API key
var censusAPIKey = "c83e06ec87c35c0d3ffb0f6d7640afbf52b7071c";
var sdk = new CitySdk(); //Create the CitySDK Instance
var census = new CensusModule(censusAPIKey); // Create an instance of the module
// sdk.modules.census = census;


// creating the request variable. Please note that I have left in income as the default variable.
// var request = {
//    "level": "county",
//    "zip": "",
//    "variables": [
       
//    ],
//    "api": "acs5",
//    "year": "",
//    "tract": ""
// };

// var request = {
//    "level": "county",
//    "zip": "30013",
//    "variables": [
//      "age"
//    ],
//    "api": "acs1",
//    "year": "2012",
//    "county": "Rockdale County",
//    "state": "GA"
//  };

apiCallBack = function (response) {
    console.log(JSON.stringify(response, null, 4));
    //Outputs the raw JSON text-full data
    jQuery("#data").text(JSON.stringify(response, null, 4));

   //  Below outputs only income or whatever is requested. 
   // jQuery("#data").text(JSON.stringify(+response.data[0].poverty, null, 4));

   //  console.log(JSON.parse(response));
   // alert("hello");
};

geoCallBack = function(response) {
      //  console.log(JSON.stringify(response, null, 4));
        var resultsArea = document.getElementById("mySidenav3");
        var theResultsContent = document.createElement("p");
        
        theResultsContent.appendChild(document.createTextNode(JSON.stringify(response, null, 4)));
        resultsArea.appendChild(theResultsContent);
        
};
    
// Function which will gather data from user and then submit it to the API. The API will then return 
// the data that was requested. 
function data(){
   // var zip = document.getElementById("zip").value;
   // var year = document.getElementById("year").value;
   // var variable = document.getElementById("variables").value;
    
    // get checkboxes
    var allCheckBoxes = document.getElementsByName("censusVarz");
    var request = {};
    
    request.level = "county";
    request.zip = "30043";
    request.api = "acs5";
    request.year = "2014";
    request.state = "GA";
    request.sublevel = true;
    request.variables = ["population", "income"];
    
    
    var values = new Array();
    var numElems = allCheckBoxes.length;
    
    for (var i = 0;i < numElems; i++) {
        if ( allCheckBoxes[i].checked ) {
           values.push(allCheckBoxes[i].value);
        }
    }

    request.variables = values;
    


    // The request to gather the actual data.
    // census.apiRequest(request, apiCallBack);   
  
    // This request is used to get geographical data for D3
    census.geoRequest(request, geoCallBack);
}

/**
    Sliding Effect
    @Notes Carlos Rincon: Do we still need this? I think this was during mike's testing but is not being used anymore.
*/
$("#menu").click(function() {
    $("#toggle").slideToggle(200);
});


// Google Maps
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), 
    {
        center: {lat: 34.1207, lng: -84.0044},
        zoom: 10,
        scrollwheel: false
    });
}