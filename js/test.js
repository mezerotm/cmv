alert("connected!");

nums = [1,2,3,4,100,6,7,9, 1000, 2,3,3245,2];

alert(Math.max.apply(null, nums));

// var highest = nums[0];

// for (var i = 0; i < nums.length; i++){
//   if (nums[i] > highest){
//     highest = nums[i];
//   }
// }

// console.log("highest value is: " + highest);

// var censusAPIKey = "c83e06ec87c35c0d3ffb0f6d7640afbf52b7071c";
// var sdk = new CitySdk(); //Create the CitySDK Instance
// var census = new CensusModule(censusAPIKey); 

// //creating the request variable. Please note that I have left in income as the default variable.
// var request = {
//     "level": "county",
//     "zip": "",
//     "variables": [
        
//     ],
//     "api": "acs5",
//     "year": "",
//     "tract": ""
// };


// //Function which will gather data from user and then submit it to the API. The API will then return 
// //the data that was requested. 
// function data(){
//     var zip = document.getElementById("zip").value;
//     var year = document.getElementById("year").value;
//     var variable = document.getElementById("variables").value;
//     //var tract = document.getElementById("tract").value;
//     request.zip = zip;
//     request.year = year;
//     request.variables.push(variable);
//     //The request to gather the actual data.
//     census.APIRequest(request, function (response) {

//       //Outputs the raw JSON text-full data
//       jQuery("#data").text(JSON.stringify(response, null, 4));

//       //Below outputs only income or whatever is requested. 
//       //jQuery("#data").text(JSON.stringify(+response.data[0].poverty, null, 4));

//     });     

// }

// /////////////  Sliding effect 

// $("#menu").click(function() {
//   $("#toggle").slideToggle(550)
// });

// ////////// Google Maps ////////////////

// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: 34.1207, lng: -84.0044},
//     zoom: 10,
//     scrollwheel: false
//     });
// }