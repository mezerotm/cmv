/*
 * cmv.js
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

// creates an active map
cmv.activeMap = cmv.display.map.getActiveMap();

// toggles to prevent duplicate requests
cmv.geoRequestASync = false;
cmv.apiRequestASync = false;

// determines the data that will displayed on the selected map
cmv.userInput = 'population';

/*
 * polygonDetail : Sets the level of cords a tract will have
 * set x to 1 and y to 0 for 100% detail
 * or set x to any value above 2 and y to 1 for more control
 */
cmv.display.map.polygonDetail = function(iterate){
	let x = 1;
	let y = 0;
	return ((iterate % x) === y);
};

/*
 * geoCallBack : This is the callback function that responds to the responses
 * from the geographical based api of the City SDK.
 * response: The JSON response from the City SDK
 */
cmv.geoCallBack = function(response){
	if(cmv.debugger.debug)
		console.log('geoCallBack: invoked, geoRequestASync: ${cmv.geoRequestASync}');

	if(response && cmv.geoRequestASync){
		if(cmv.debugger.debug){
			console.log('geoCallBack: response:');
			console.log(response);
		}

		// this is the variable being converted from, something like income, to the SKD key of B19013_001E
		let convertedVariable = cmv.census.parseToValidVariable(cmv.userInput, cmv.activeMap.request.api, cmv.activeMap.request.year) + '';

		if(cmv.debugger.debug)
			console.log('convertedVariable: ${convertedVariable}');

		// Step 1: Determines the array of colors
		if (cmv.colors_num == cmv.colors.length)
			cmv.colors_num = 0;
		else
			cmv.colors_num++;
		let colors = cmv.colors[cmv.colors_num];

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

			values.push({minimum: minVal, maximum: maxVal});

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
				intervals.push({lower: min, upper: min + intervalValue});
				min = min + intervalValue;
			}

			return intervals;
		})();

		// Step 4: Assign colors to tract
		let variablesArray = [];

		for(let i = 0; i < response.features.length; i++){
			let dataPoint = response.features[i].properties[convertedVariable];
			let colorValue;

			for(let j = 0; j < colors.length; j++)
				if(dataPoint >= intervals[j].lower && dataPoint < intervals[j].upper){
					colorValue = colors[j];
					break;
				}else
					colorValue = colors[colors.length - 1];

			variablesArray.push({value: dataPoint, color: colorValue});
		}


        for(let i = 0; i < variablesArray.length; i++) {
            if (isNaN(variablesArray[i].value))
			{
                setTimeout(cmv.run());
                console.log("ERROR HELLO")
				return;
        	}
		}


		if(cmv.debugger.debug){
			console.log('geoCallBack: variablesArray:');
			console.log(variablesArray);
		}

		if(cmv.debugger.debug)
			console.log('geoCallBack: response.features.length: ${response.features.length}');


     	//cmv.activeMap.centerMap();
		cmv.display.map.centerActiveMap();

		// draw on to map
		for(let tract = 0; tract < response.features.length; tract++){
			let coords = [];
			for(let j = 0; j < response.features[tract].geometry.coordinates[0].length; j++)
				if(cmv.display.map.polygonDetail(j))
					coords.push(new google.maps.LatLng(response.features[tract].geometry.coordinates[0][j][1], response.features[tract].geometry.coordinates[0][j][0]));
					//this manual cast to LatLng object only works for most zip codes, not all. The constructor given by google maps API works for all zip codes
					/*coords.push({
						lat: response.features[tract].geometry.coordinates[0][j][1],
						lng: response.features[tract].geometry.coordinates[0][j][0]
					});*/


			cmv.activeMap.polygons.push(new google.maps.Polygon({
				map: cmv.activeMap.googleMap,
				paths: coords,
				strokeColor: variablesArray[tract].color,
				fillColor: variablesArray[tract].color,

				strokeOpacity: cmv.activeMap.googleProperties.strokeOpacity,
				strokeWeight: cmv.activeMap.googleProperties.strokeWeight,
				fillOpacity: cmv.activeMap.googleProperties.fillOpacity
			}));
		}


                // Step: 5 create the legend markers

                // determine which map has the focus now.
                var mapNumber = 0;  // is this stored in the map object?
                for (var mapPos = 0; mapPos < cmv.display.maps.length; mapPos++) {
                    if (cmv.display.maps[mapPos].focus == true) {
                        mapNumber = mapPos;
                    }
                }

                var mapLegend = document.getElementById("mapLegend" + mapNumber);

                // clear out the old legend just in case the user is just changing variables
                while (mapLegend.firstChild) {
                     mapLegend.removeChild(mapLegend.firstChild);
                }
                // this resets the title of the map legends box because we just destroyed all
                // of the nodes.
                mapLegend.innerHTML = '<center><h3>Legend</h3></center>';

               // This loop obtains the data to display in the map legend
               // The colors and their corresponding upper and lower bounds
               // The approach is to build a div container for each legend entry
               // and then put an icon (the colored box) and label (data) into
               // legend as one row in the legend. This repeatedly does this for
               // all colors.
                for(let colorPos = 0; colorPos < colors.length; colorPos++) {
                    var color = colors[colorPos];

                    if (isNaN(intervals[colorPos].lower)) {
                        var lower = intervals[colorPos].lower;
                        console.log("Not a number found");
                    } else {
                        var lower = intervals[colorPos].lower.toFixed(2);
                    }
                    if (isNaN(intervals[colorPos].upper)) {
                        var upper = intervals[colorPos].upper;
                    } else {
                        var upper = intervals[colorPos].upper.toFixed(2);
                    }

                    var icon = document.createElement('div');
                    // this styling ensures that the icon (the colored box) is to the left
                    // of the text label.
                    icon.setAttribute("style", "padding-right:5px;clear:left;float:left; width:20px; height:10px; background-color:" + color);
                    // creates a text label with the bounds.
                    var label = document.createTextNode( lower + ' - ' + upper);

                    // create the container for both the icon and label
                    var legendEntry = document.createElement('div');
                    legendEntry.appendChild(icon);
                    legendEntry.appendChild(label);

                    // adds a row to the legend
                    mapLegend.appendChild(legendEntry);
                }
                
                
                // Step 6. Create Map Title
                var mapTitle = document.getElementById("mapTitle" + mapNumber);
                mapTitle.innerHTML = '<center><h1>' + cmv.getTitleFromKey(convertedVariable) + '</h1></center>';
                mapTitle.style.display = 'block';           // Unhide

		cmv.activeMap.progressBar.stop();


	}else if(!cmv.geoRequestASync && cmv.debugger.debug)
		console.log('geoCallBack: duplicate geo request callback');
	else
		console.log("No response");

	cmv.geoRequestASync = false;
};

/*
 * dataCallBack : This is the callback function that responds to the responses
 * from the census data based api of the City SDK.
 * response: The JSON response from the City SDK
 */
cmv.dataCallBack = function(response){
	if(cmv.apiRequestASync && cmv.debugger.debug){
		console.log('dataCallBack: invoked');

	}else if(!cmv.apiRequestASync && cmv.debugger.debug){
		console.log('dataCallBack: duplicate api request callback')

	}else if(cmv.debugger.debug){
		console.log("dataCallBack: data callback did not get a valid response");
		return false;
	}

	cmv.apiRequestASync = false;
};

//called when the user hits the submit button to prevent the citysdk requests from being made before the citysdk request is assembled with correct location info
cmv.run = function()
{
	cmv.display.map.resetRequest();
	cmv.display.map.resetActiveMapDisplay();
	cmv.display.location.updatePlace();
	cmv.retrieveData();
};

/*
 * retrieveData : This function is called by the submit button to connect with the City
 * SDK and obtain the data.
 */
cmv.retrieveData = function(){
	cmv.display.map.getActiveMap().progressBar.start();

	if(cmv.debugger.debug)
		console.log('retrieveData: invoked');

	cmv.display.map.mapRequestASync = false;
	cmv.geoRequestASync = true;
	cmv.apiRequestASync = true;

	// set active map
	cmv.activeMap = cmv.display.map.getActiveMap();
	//reset active map request to an empty one (with only default values filled)
	//cmv.activeMap.request = cmv.display.map_request_template;

	//set location details for the current request using the google places api
	if(cmv.display.location.placeUpdated == false)
	{
		setTimeout(cmv.retrieveData, 100);
		console.log("retrieveData - waiting for place update");
	}
	else
	{
        cmv.display.location.setLocationDetails();
		if(cmv.display.location.location_updated == false) {
            setTimeout(cmv.retrieveData, 100)
            console.log("retrieveData - waiting for location update")
        }
		if(cmv.debugger.debug)
			console.log(cmv.activeMap);

		// get checkboxes from the web page
		let checkBoxes = document.getElementsByName("censusVar");

		// array to hold checked variables
		let checkedBoxes = [];
		let checked = false;

		// processes each checkbox and determines which boxes have been checked
		for(let i = 0; i < checkBoxes.length; i++){
			if(checkBoxes[i].checked){
				checkedBoxes.push(checkBoxes[i].value);
				checked = true;
			}
		}

		// fill the census data request with the variables selected by the user
		if(checked)
			cmv.activeMap.request.variables = checkedBoxes;
		else
			cmv.activeMap.request.variables = ['population'];

		cmv.userInput = cmv.activeMap.request.variables[0];

		if(cmv.debugger.debug){
			console.log(`retrieveData: request.variables: ${cmv.activeMap.request.variables}`);
			console.log('retrieveData: request:');
			console.log(cmv.activeMap.request);
		}

		// This request is used to get geographical data
		cmv.census.geoRequest(cmv.activeMap.request, cmv.geoCallBack);

		// This request is used to get the data to correlate with the Geo location data
		cmv.census.apiRequest(cmv.activeMap.request, cmv.dataCallBack);

		//(DOES NOT WORK) cmv.activeMap.request = cmv.display.map_request_template;
	}
};


// Census Vars functions
cmv.getVariableFromKey = function(keyValue) {
    for (var i = 0; i < cmv.CENSUS_VARS.length; i++) {
        if (cmv.CENSUS_VARS[i].key === keyValue)
            return cmv.CENSUS_VARS[i].value;
    }

    return "Undefined";
};


cmv.getTitleFromKey = function(keyValue) {
    for (var i = 0; i < cmv.CENSUS_VARS.length; i++) {
        if (cmv.CENSUS_VARS[i].key === keyValue)
            return cmv.CENSUS_VARS[i].title;
    }

    return "Undefined";
};

