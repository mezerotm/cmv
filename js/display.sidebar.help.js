/*
* cmv.display.sidebar.help.js
*
*/

// help page content
cmv.display.sidebar.help.content = '<p>CONTENT</p>';

// sets content to HTML on runtime
(function(){
    $("#canvas-control-help-center").html(cmv.display.sidebar.help.content);
}());

// toggles help page - the help page will try to disable things such as page opening, map view selection, and map dragging
cmv.display.sidebar.help.open = function(){
	if(!cmv.display.sidebar.help.open.toggle){
	    $("#canvas-control-help").toggle();
	    cmv.display.map.disableMaps();
	    cmv.display.sidebar.open('');
	}else{
	    //$("#canvas-control-help-center").toggle();
	    cmv.display.map.enableMaps();
	}
	
	// toggles
	cmv.display.sidebar.help.open.toggle = !cmv.display.sidebar.help.open.toggle;
};

// static variable within sidebar.open function
cmv.display.sidebar.help.open.toggle = false;