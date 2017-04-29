/*
 * census-init.js
 *
 * ** it's important that this file be imported before any other custom file **
 *
 * Creates a global variable census to be used throughout the entire project
 *
 * Creates all cmv modules that will be used throughout the entire project
 */

// create cmv module (This will reduce chances of variable clobber, and modularize our code)
let cmv = {};

cmv.census = new CensusModule("c83e06ec87c35c0d3ffb0f6d7640afbf52b7071c");

cmv.debugger = {};

//the index of the colors currently being used for the next map
cmv.colors_num = 0;
//the colors that are being used to color the next map
cmv.colors = [
    ['#FFCCCC', '#FF9999', '#FF6666', '#FF3333', '#F00000'],
    ['#FFFFCC', '#FFE999', '#FFB666', '#FF8333', '#E65000'],
    ['#CCE6FF', '#99B3FF', '#6680FF', '#334DFF', '#001ADB'],
    ['#CCFFD9', '#99FFA6', '#66FF73', '#33FF40', '#00FF0D']
];


cmv.display = {};
cmv.display.help = {};
cmv.display.topbar = {};
cmv.display.sidebar = {};
cmv.display.sidebar.help = {};
cmv.display.maps = []; // see './js/display.map.js' for additional information

cmv.CENSUS_VARS = [
             {key: "B01002_002E", value: "median_male_age", title:"Median age -- Male"}, // median age male 
             {key: "B01002_003E", value: "median_female_age", title:"Median age -- Female"}, // median age female
             {key: "B01003_001E", value: "population",  title:"Total Population"}, // total population
             {key: "B15003_002E", value: "education_none", title:"No Schooling Completed"}, // No schooling completed
             {key: "B15003_017E", value: "education_high_school", title:"Regular High School Diploma"}, // Regular high school diploma
             {key: "B15003_018E", value: "education_ged", title:"GED or Alternative Credential"}, // GED or alternative credential
             {key: "B15003_021E", value: "education_associates", title:"Associate's Degree"}, // Associate's Degree
             {key: "B15003_022E", value: "education_bachelors", title:"Bachelor's Degree"}, // Bachelor's degree
             {key: "B15003_023E", value: "education_masters",  title:"Master's Degree"}, // Master's degree
             {key: "B15003_024E", value: "education_professional", title:"Professional School Degree"}, // Professional school degree
             {key: "B17001_002E", value: "poverty", title:"Income in the Past 12 Months Below Poverty Level"}, // Income in the past 12 months below poverty level
             {key: "B19013_001E", value: "income", title:"Median Household Income in the Past 12 Months"}, // Median household income in the past 12 months (in 2013 inflation-adjusted dollars)
             {key: "B19301_001E", value: "income_per_capita", title:"Per Capita Income in the Past 12 Months"}, // Per capita income in the past 12 months (in 2013 inflation-adjusted dollars)
             {key: "B23025_005E", value: "employment_unemployed", title:"In labor force: Civilian labor force: Unemployed"}, // In labor force:!!Civilian labor force:!!Unemployed
             {key: "B23025_007E", value: "employment_not_labor_force", title:"Not in labor force"}, // Not in labor force
             {key: "B08136_001E", value: "commute_time", title:"Aggregate Travel Time to Work (Minutes)"}, // Aggregate travel time to work (in minutes)
             {key: "B08136_004E", value: "commute_time_carpool", title:"Car, truck, or van: Carpooled (Minutes)"}, // Car, truck, or van: Carpooled
             {key: "B08136_007E", value: "commute_time_public_transport", title:"Public transportation (excluding taxicab) (Minutes)"}, // Public transportation (excluding taxicab)
             {key: "B08136_003E", value: "commute_time_solo_automobile", title:"Car, truck, or van: Drove alone (Minutes)"} // Car, truck, or van: Drove alone
    ];
  

cmv.initPlace = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(cmv.setInitPlace, cmv.errorHandleInitPlace);
    } else {
        console.log( "Geolocation is not supported by this browser.");
        cmv.setInitPlace({'coords': {'latitude': 33.7493, 'longitude': -84.3883}}); // set default location to lawrenceville, GA
    }
}

cmv.setInitPlace = function(location) {

    //create request based on default lat and long for the program
    var place_request = {
        query: (location.coords.latitude + ', ' + location.coords.longitude)
    };

    //search for a place given the default lat and long for the program
    cmv.display.location.location_service.textSearch(place_request, function(results, status) {
        if(status == google.maps.places.PlacesServiceStatus.OK) {
            var p = results[0];
            var place_request2 = {
                reference: p.reference
            };

            //get detailed information on the place found by the search
            cmv.display.location.location_service.getDetails(place_request2, function(p, status) {
                if(status == google.maps.places.PlacesServiceStatus.OK) {

                    //will hold the formatted output to be printed to the textbox shown to the user (the location_input textbox)
                    addr_string = {
                        city: "",
                        state: "",
                        zip: "",
                        country: ""
                    };

                    for(i = 0; i < p.address_components.length; i++)
                    {
                        //compose string for showing in text box
                        if(p.address_components[i].types[0] == "locality")
                            addr_string.city = p.address_components[i].long_name;
                        else if(p.address_components[i].types[0] == 'administrative_area_level_1')
                            addr_string.state = p.address_components[i].long_name;
                        else if(p.address_components[i].types[0] == 'postal_code')
                            addr_string.zip = p.address_components[i].long_name;
                        else if(p.address_components[i].types[0] == 'country')
                            addr_string.country = p.address_components[i].long_name;
                    }

                    if(addr_string.country != "United States")
                        console.log("That location is not within the United States, it is in " + addr_string.country + ". Please enter a valid location within the United States");
                    else
                    {
                        cmv.display.location.place = p;
                        //$("#location_input").val(JSON.stringify(cmv.display.location.place.address_components));


                        //concatenate the parts of the addr_string into the final string to be put in the location_input textbox
                        if(addr_string.city == "")
                            final_addr_string = addr_string.state + " " + addr_string.zip + ", " + addr_string.country;
                        else
                            final_addr_string = addr_string.city + ", " + addr_string.state + " " + addr_string.zip + ", " + addr_string.country;

                        $("#location_input").val(final_addr_string);

                        cmv.display.location.placeTextVal = $("#location_input").val();
                    }


	                if(cmv.debugger.debug) console.log("default place set");
                    cmv.display.location.place = p;
                    cmv.display.location.placeUpdated = true;
                    //center all maps on this new default location
                    cmv.initCenterMaps();
                    return true;
                }
            });
        }
        else
            console.log("ERROR in textsearch for default place");
    });
};

//center all maps on the current place
cmv.initCenterMaps = function()
{
    //set the location for all of the maps to this default location
    for(i = 0; i < cmv.display.maps.length; i++)
    {
        cmv.display.maps[i].centerMap();
    }
};


//error handling for setting initial place of maps
cmv.errorHandleInitPlace = function(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            cmv.setInitPlace({'coords': {'latitude': 33.7493, 'longitude': -84.3883}}); // set default location to lawrenceville, GA
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable for initial map place");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location for initial map place timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred when setting initial map place.")
            break;
    }
};

//run the function to set the default place for the map
cmv.initPlace();