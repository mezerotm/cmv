/*
 * main.js
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

/*
* "Please note, that the "place" level currently only supports incorporated places." - (https://goo.gl/CHdOWp)
*  Please see './documentation.js' for additional information
* */
cmv.map.level = 'county';    // 'blockGroup', 'tract', 'county', 'state', 'us', 'place'
cmv.map.zip = '30043';       // atlanta: 30303, duluth: 30096, Lawrenceville: 30043 - (https://goo.gl/IJGxoJ)
cmv.map.api = 'acs5';        // acs5: 5yr 09-15 - (https://goo.gl/1tBXON)
cmv.map.year = '2014';
cmv.map.state = 'GA';
cmv.map.sublevel = true;

// toggles to prevent duplicate requests
cmv.geoRequestToggle = false;
cmv.apiRequestToggle = false;

// determines the data that will displayed on the selected map
cmv.userInput = 'population';

/*
 * polygonDetail : Sets the level of cords a tract will have
 * set x to 1 and y to 0 for 100% detail
 * or set x to any value above 2 and y to 1 for more control
 */
cmv.map.polygonDetail = function(iterate){
    let x = 1; let y = 0;
    return ((iterate % x) === y);
};

/*
 * geoCallBack : This is the callback function that responds to the responses
 * from the geographical based api of the City SDK.
 * response: The JSON response from the City SDK
 */
cmv.geoCallBack = function (response){
    if(cmv.debugger.debug)
        console.log(`geoCallBack: invoked, geoRequestToggle: ${cmv.geoRequestToggle}`);

    if(response && cmv.geoRequestToggle){
        if(cmv.debugger.debug) {
            console.log('geoCallBack: response:'); console.log(response);
        }

        // this is the variable being converted from, something like income, to the SKD key of B19013_001E
        let convertedVariable = cmv.census.parseToValidVariable(cmv.userInput, cmv.map.api, cmv.map.year) + '';

        if(cmv.debugger.debug)
            console.log(`convertedVariable: ${convertedVariable}`);

        // Step 1: Determines the array of colors
        let colors = ['#FEEDDE', '#FDBE85', '#FD8D3C', '#E6550D', '#A63603'];

        // Step 2: Determine the range
        let minMaxValue = (function(){
            // setting the highest and lowest variables to measure all other variables against
            let minVal, maxVal;

            let variablesArray = [];

            //Setting up an object to return the minimum and maximum values.
            let values = [];

            // pushes values into variables array
            for(let i = 0; i < response.features.length; i++){
                let points = response.features[i].properties[convertedVariable];
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

           for(let j = 0; j < colors.length; j++)
               if (dataPoint >= intervals[j].lower && dataPoint < intervals[j].upper) {
                   colorValue = colors[j];
                   break;
               }else
                   colorValue = colors[colors.length - 1];

            variablesArray.push({value: dataPoint, color: colorValue});
        }

        if(cmv.debugger.debug) {
            console.log(`geoCallBack: variablesArray:`); console.log(variablesArray);
        }

        // get active map
        let activeMap = document.getElementById('active_map_holder').value;

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
                if(cmv.map.polygonDetail(j))
                    coords.push({lat: response.features[tract].geometry.coordinates[0][j][1], lng: response.features[tract].geometry.coordinates[0][j][0]});


            let mapOverlay = new google.maps.Polygon({
                map: map,
                paths: coords,
                strokeOpacity: 1.5,
                strokeWeight: 1,
                strokeColor: variablesArray[tract].color,
                fillColor:  variablesArray[tract].color,
                fillOpacity: .75
            });

            if(cmv.debugger.debug)
                console.log(`geoCallBack: response.features.length: ${response.features.length}`);
        }

    }else if(!cmv.geoRequestToggle && cmv.debugger.debug)
        console.log('geoCallBack: duplicate geo request callback');

    cmv.geoRequestToggle = false;
};

/*
 * dataCallBack : This is the callback function that responds to the responses
 * from the census data based api of the City SDK.
 * response: The JSON response from the City SDK
 */
cmv.dataCallBack = function(response) {
    if (cmv.apiRequestToggle && cmv.debugger.debug){
        console.log('dataCallBack: invoked');

    }else if(!cmv.apiRequestToggle && cmv.debugger.debug) {
        console.log('dataCallBack: duplicate api request callback')

    }else if(cmv.debugger.debug) {
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
    if(cmv.debugger.debug)
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
        level: cmv.map.level,
        zip: cmv.map.zip,
        api: cmv.map.api,
        year: cmv.map.year,
        state: cmv.map.state,
        sublevel: cmv.map.sublevel,
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

    if(cmv.debugger.debug) {
        console.log(`retrieveData: request.variables: ${request.variables}`);
        console.log('retrieveData: request:'); console.log(request);
    }

    // This request is used to get geographical data
     cmv.census.geoRequest(request, cmv.geoCallBack);

    // This request is used to get the data to correlate with the Geo location data
     cmv.census.apiRequest(request, cmv.dataCallBack);
};