/*
 * documentation.js
 *
 * A collection of all CMV related notes and documentation in a central location
 * this includes information both online and references to the citysdk folder in the local directory
 *
 * ADDITIONAL SUPPLEMENTAL DOCUMENTATION CAN BE FOUND AT './citysdk/docs/' && './citysdk/examples/'
 */

/*
A list of all possible CMV modules, in order of dependency

CMV
|- documentation
|- display
|    |- topbar
|    |- sidebar
|    |- maps
|- cmv
*/

/*
Census Module Developer Documentation - (https://goo.gl/Wg20Wz)
How to Use the Census Module # requestingVariables - (https://goo.gl/CHdOWp)
A list of all available APIs to choose from - (https://goo.gl/ErNc5l)
*/

// flag for debug output
cmv.debugger.debug = true;
cmv.debugger.documentation = false;

if(cmv.debugger.documentation){

	// Will log all census variables in RAW
	console.log(cmv.census.getACSVariableDictionary('acs5', '2014'));

	// './citysdk/js/modules/citysdk.census.js' - line: 119
	console.log(cmv.census.aliases);

	// './citysdk/js/core/citysdk.js' - line: 197
	console.log(cmv.census.stateCapitals);

}

/*
"Please note, that the "place" level currently only supports incorporated places." - (https://goo.gl/CHdOWp)
Please see './documentation.js' for additional information

'blockGroup', 'tract', 'county', 'state', 'us', 'place'
atlanta: 30303, duluth: 30096, Lawrenceville: 30043 - (https://goo.gl/IJGxoJ)
acs5: 5yr 09-15 - (https://goo.gl/1tBXON)
*/



/*
--- Google Maps API ---
(https://goo.gl/vRl6Gi)

examples/polygon-simple (https://goo.gl/4famC3)
geoloaction (https://goo.gl/k0jdcw)
*/
