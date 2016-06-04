var censusAPIKey = "cdfd4ff35b1ffdf619b567c6fa2988fd3099ead";
var sdk = new CitySdk(); //Create the CitySDK Instance
var census = new CensusModule(censusAPIKey); //Create an instance of the module
sdk.modules.census = census;


//creating the request variable. Please note that I have left in income as the default variable.
//var request = {
//    "level": "county",
//    "zip": "",
//    "variables": [
//        
//    ],
//    "api": "acs5",
//    "year": "",
//    "tract": ""
//};

var request = {
    "level": "county",
    "zip": "30013",
    "variables": [
      "age"
    ],
    "api": "acs1",
    "year": "2012",
    "county": "Rockdale County",
    "state": "GA"
  };

apiCallBack = function (response) {
    alert(response);
    //Outputs the raw JSON text-full data
    jQuery("#data").text(JSON.stringify(response, null, 4));

    //Below outputs only income or whatever is requested. 
   //jQuery("#data").text(JSON.stringify(+response.data[0].poverty, null, 4));

    //console.log(JSON.parse(response));
   // alert("hello");
};


console.log(sdk);
console.log(census);
census.apiRequest(request, apiCallBack);    
     


    
//Function which will gather data from user and then submit it to the API. The API will then return 
//the data that was requested. 
function data(){
    var zip = document.getElementById("zip").value;
    var year = document.getElementById("year").value;
    var variable = document.getElementById("variables").value;
    //var tract = document.getElementById("tract").value;
    //request.zip = zip;
    //request.year = year;
    //request.variables.push(variable);
console.log(citysdk);
  console.log(census);


    //The request to gather the actual data.
    census.apiRequest(request, apiCallBack);   
    
    
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