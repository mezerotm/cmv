/*
* census-init.js
*
* ** it's important that this file be imported before any other custom file **
*
* Creates a global variable census to be used throughout the entire project
*
* Creates all cmv modules that will be used throughout the entire project
*/

/*
 * A list of all possible CMV modules, in order of dependency
 *
 * CMV
 * |- debugger
 * |- display
 * |    |- topbar
 * |    |- sidebar
 * |    |- maps
 * |- map
 *
 * */

// create cmv module (This will reduce chances of variable clobber, and modularize our code)
let cmv = {};

cmv.census = new CensusModule("c83e06ec87c35c0d3ffb0f6d7640afbf52b7071c");

cmv.debugger = {};

cmv.display = {};
cmv.display.topbar = {};
cmv.display.sidebar = {};
cmv.display.maps = {};

cmv.map = {};
