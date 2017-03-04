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
  
 
