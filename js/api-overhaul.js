// create cmv module (This will reduce chances of variable clobber, and modularize our code)
let cmv = {};

// flag for debug output
cmv.debug = true;

// Census Module Developer Documentation - (https://goo.gl/Wg20Wz)
cmv.census = new CensusModule("c83e06ec87c35c0d3ffb0f6d7640afbf52b7071c");

/*
* "Please note, that the "place" level currently only supports incorporated places." - (https://goo.gl/CHdOWp)
*  A list of all available APIs to choose from - (https://goo.gl/ErNc5l)
* */
cmv.level = 'county';    // 'blockGroup', 'tract', 'county', 'state', 'us', 'place'
cmv.zip = '30043';       // atlanta: 30303, duluth: 30096, Lawrenceville: 30043 - (https://goo.gl/IJGxoJ)
cmv.api = 'acs5';        // acs5: 5yr 09-15 - (https://goo.gl/1tBXON)
cmv.year = '2014';
cmv.state = 'GA';
cmv.sublevel = true;

// Will log all census variables in RAW
//console.log(cmv.census.getACSVariableDictionary(cmv.api, cmv.year));
//console.log(cmv.census.aliases);

// toggles to prevent duplicate requests
cmv.geoRequestToggle = false;
cmv.apiRequestToggle = false;

// determines the data that will displayed on the selected map
cmv.userInput = 'population';

// 2D array containing maps; and they're related polygon data
cmv.polygonMaps = [];

/*
 * polygonDetail : Sets the level of cords a tract will have
 * set x to 1 and y to 0 for 100% detail
 * or set x to any value above 2 and y to 1 for more control
 */
cmv.polygonDetail = function(iterate){
    let x = 0; let y = 0;
    return ((iterate % x) === y);
};

/*
 * geoCallBack : This is the callback function that responds to the responses
 * from the geographical based api of the City SDK.
 * response: The JSON response from the City SDK
 */
cmv.geoCallBack = function (response){
    if(cmv.debug)
        console.log(`geoCallBack: invoked, geoRequestToggle: ${cmv.geoRequestToggle}`);

    if(response && cmv.geoRequestToggle){
        if(cmv.debug) {
            console.log('geoCallBack: response:'); console.log(response);
        }

        // this is the variable being converted from, something like income, to the SKD key of B19013_001E
        let censusVarsMap = new CensusVariablesMap();
        let convertedVariable = cmv.census.parseToValidVariable(cmv.userInput, cmv.api, cmv.year);

        // Step 1: Determines the array of colors
        let colors = ["red", "pink", "yellow", "blue", "green" ];

        // Step 2: Determine the range
        let minMaxValue = (function(){
            // setting the highest and lowest variables to measure all other variables against
            let minVal, maxVal;

            let variablesArray = [];

            //Setting up an object to return the minimum and maximum values.
            let values = [];

            // pushes values into variables array
            for(let i = 0; i < response.features.length; i++){
                let points = response.features[convertedVariable];
                variablesArray.push(points);
            }

            minVal = Math.min.apply(null, variablesArray);
            maxVal = Math.max.apply(null, variablesArray);

            values.push({ minimum: minVal, maximum: maxVal });

            return values;
        })();

        // Step 3: Create the intervals
        let intervals = (function(){
            //An array to hold the array of objects for the lower and upper bounds.
            let intervals = [];

            //Setting out the variables for the max and min values.
            let max = minMaxValue[0].maximum;
            let min = minMaxValue[0].minimum;

            //Calculating the entire length from the max and min values.
            let length = max - min;

            //Determining the interval value
            let intervalValue = length / colors.length;

            //Using a for loop to push the lower/upper bounds into the intervals array.
            for(let i = 0; i < colors.length; i++){
                intervals.push({ lower: min, upper: min + intervalValue });
                min = min + intervalValue;
            }

            return intervals;
        })();

        // Step 4: Assign colors to tract
        let variablesArray = [];

        for(let i = 0; i < response.features.length; i++){
           let dataPoint =  response.features[i].properties[convertedVariable];
           let colorValue;

           for(let j = 0; j < colors.length; j++){
               if(dataPoint >= intervals[j].lower && dataPoint < intervals[j].upper)
                   colorValue = colors[j];
               else
                   colorValue = colors.length;

               variablesArray.push({value: dataPoint, color: colorValue});
           }
        }

        // clear active map drawing
        let activeMap = document.getElementById('active_map_holder').value;
        cmv.polygonMaps = [];

        // create a new map
        let map = new google.maps.Map(document.getElementById(`map${activeMap}`), {
            zoom: 7,
            center: {lat: 33.895, lng: -84.210},
            mapTypeControlOptions: {
                mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain']
            }
        });

        // draw on to map
        for(let tract = 0; tract < response.features.length; tract++){
            let coords = [];
            for (let j  = 0; j < response.features[tract].geometry.coordinates[0].length; j++)
                if(cmv.polygonDetail(j))
                    coords.push({lat: response.features[tract].geometry.coordinates[0][j][1], lng: response.features[tract].geometry.coordinates[0][j][0]});

            if(cmv.debug)
                console.log(`geoCallBack: response.features.length: ${response.features.length}`);

            let mapOverlay = new google.maps.Polygon({
                map: map,
                paths: coords,
                strokeOpacity: 0.75,
                strokeWeight: 2,
                fillColor:  variablesArray[tract].color,
                fillOpacity: 0.75
            });

            // TEMPORARY: creating a new map on every call is inefficient, i did this to remove dependency from './active_map.js'
            // todo: overhaul './active_map.js' to retain modular dependency
            mapOverlay.setMap(map);

            // todo: do checks to see if this 2D array works, and is properly pushing
            cmv.polygonMaps.push(mapOverlay);
        }

    }else if(!cmv.geoRequestToggle && cmv.debug)
        console.log('geoCallBack: duplicate geo request callback');

    cmv.geoRequestToggle = false;
};

/*
 * dataCallBack : This is the callback function that responds to the responses
 * from the census data based api of the City SDK.
 * response: The JSON response from the City SDK
 */
cmv.dataCallBack = function(response) {
    if (cmv.apiRequestToggle && cmv.debug){
        console.log('dataCallBack: invoked');

    }else if(!cmv.apiRequestToggle && cmv.debug) {
        console.log('dataCallBack: duplicate api request callback')

    }else if(cmv.debug) {
        console.log("dataCallBack: data callback did not get a valid response");
        return false;
    }

    cmv.apiRequestToggle = false;
};

/*
 * retrieveData : This function is called by the submit button to connect with the City
 * SDK and obtain the data.
 */
 cmv.retrieveData = function(){
    if(cmv.debug)
        console.log('retrieveData: invoked');

    cmv.geoRequestToggle = true;
    cmv.apiRequestToggle = true;

    // get checkboxes from the web page
    let checkBoxes = document.getElementsByName("censusVar");

    // array to hold checked variables
    let checkedBoxes = [];
    let checked = false;

    // configure the census data request
    let request = {
        level: cmv.level,
        zip: cmv.zip,
        api: cmv.api,
        year: cmv.year,
        state: cmv.state,
        sublevel: cmv.sublevel,
    };

    // processes each checkbox and determines which boxes have been checked
    for(let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            checkedBoxes.push(checkBoxes[i].value);
            checked = true;
        }
    }

    // fill the census data request with the variables selected by the user
    if(checked)
        request.variables = checkedBoxes;
    else
        request.variables = ['population'];

    cmv.userInput = request.variables[0];

    if(cmv.debug) {
        console.log(`retrieveData: request.variables: ${request.variables}`);
        console.log('retrieveData: request:'); console.log(request);
    }

    // This request is used to get geographical data
    cmv.census.geoRequest(request, cmv.geoCallBack);

    // This request is used to get the data to correlate with the Geo location data
    cmv.census.apiRequest(request, cmv.dataCallBack);
};