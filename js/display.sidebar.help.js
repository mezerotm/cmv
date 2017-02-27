/*
 * cmv.display.sidebar.help.js
 *
 */

// help page content
cmv.display.sidebar.help.content = '<img id="canvas-control-help-dimmer" src="img/dimmer.png">' +
	'<img id="canvas-control-help-labels" src="img/sidebar-labels.png" alt="icon labels">';

// sets content on HTML on runtime (self invoking function)
(function(){
	$("#canvas-control-help").html(cmv.display.sidebar.help.content);
}());

// toggles help page - the help page will try to disable things such as page opening, map view selection, and map dragging
cmv.display.sidebar.help.open = function(){
	if(!cmv.display.sidebar.help.open.toggle){
		$("#canvas-control-help").toggle();
		cmv.display.map.disableMaps();
		cmv.display.sidebar.open('');
	}else{
		$("#canvas-control-help").toggle();
		cmv.display.map.enableMaps();
	}

	// toggles
	cmv.display.sidebar.help.open.toggle = !cmv.display.sidebar.help.open.toggle;
};

// adds click listener to entire canvas-control-help screen
$("#canvas-control-help").click(function(){
	cmv.display.sidebar.help.open();
})

// static variable within sidebar.open function
cmv.display.sidebar.help.open.toggle = false;
