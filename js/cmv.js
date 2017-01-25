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
		console.log(`geoCallBack: invoked, geoRequestASync: ${cmv.geoRequestASync}`);

	if(response && cmv.geoRequestASync){
		if(cmv.debugger.debug){
			console.log('geoCallBack: response:');
			console.log(response);
		}

		// this is the variable being converted from, something like income, to the SKD key of B19013_001E
		let convertedVariable = cmv.census.parseToValidVariable(cmv.userInput, cmv.activeMap.request.api, cmv.activeMap.request.year) + '';

		if(cmv.debugger.debug)
			console.log(`convertedVariable: ${convertedVariable}`);

		// Step 1: Determines the array of colors
		// todo: find a way to pragmatically change the tint/shade
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

		if(cmv.debugger.debug){
			console.log(`geoCallBack: variablesArray:`);
			console.log(variablesArray);
		}

		if(cmv.debugger.debug)
			console.log(`geoCallBack: response.features.length: ${response.features.length}`);

		// draw on to map
		for(let tract = 0; tract < response.features.length; tract++){
			let coords = [];
			for(let j = 0; j < response.features[tract].geometry.coordinates[0].length; j++)
				if(cmv.display.map.polygonDetail(j))
					coords.push({
						lat: response.features[tract].geometry.coordinates[0][j][1],
						lng: response.features[tract].geometry.coordinates[0][j][0]
					});

			new google.maps.Polygon({
				map: cmv.activeMap.googleMap,
				paths: coords,
				strokeColor: variablesArray[tract].color,
				fillColor: variablesArray[tract].color,

				strokeOpacity: cmv.activeMap.googleProperties.strokeOpacity,
				strokeWeight: cmv.activeMap.googleProperties.strokeWeight,
				fillOpacity: cmv.activeMap.googleProperties.fillOpacity
			});
		}

		cmv.display.topbar.ProgressBarStop();
	}else if(!cmv.geoRequestASync && cmv.debugger.debug)
		console.log('geoCallBack: duplicate geo request callback');

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

/*
 * retrieveData : This function is called by the submit button to connect with the City
 * SDK and obtain the data.
 */
cmv.retrieveData = function(){
	cmv.display.topbar.ProgressBarStart();

	if(cmv.debugger.debug)
		console.log('retrieveData: invoked');

	cmv.geoRequestASync = true;
	cmv.apiRequestASync = true;

	// set active map
	cmv.activeMap = cmv.display.map.getActiveMap();

	//set location details for the current request using the google places api
	cmv.display.location.setLocationDetails();

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

	cmv.activeMap.request = cmv.display.map_request_template;
};