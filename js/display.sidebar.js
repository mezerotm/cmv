/*
 * display/sidebar.js
 *
 */

// opens the desired page, closes all pages if no parameter
cmv.display.sidebars.open = function(pageName){
	let activeClass = document.getElementsByClassName('sidepage active');

	// open and close pages
	if(pageName && !cmv.display.map.disableMap.toggle && cmv.display.sidebars.isOpened !== pageName){
		for(let i = 0; i < activeClass.length; i++)
			activeClass[i].className = 'sidepage inactive';

		// activate specific sidepage
		document.getElementById(`sidepage-${pageName}`).className = 'sidepage active';
		cmv.display.sidebars.isOpened = pageName;

		// resize maps
		cmv.display.topbar.mapContainer.style.width = 'calc(100% - 290px)';

	}else{
		for(let i = 0; i < activeClass.length; i++)
			activeClass[i].className = 'sidepage inactive';
		cmv.display.sidebars.isOpened = undefined;

		// resize maps
		cmv.display.topbar.mapContainer.style.width = 'calc(100% - 45px)';
	}
};

// toggles help page - the help page will try to disable things such as page opening, map view selection, and map dragging
cmv.display.sidebars.help = function(){
	$("#canvas-control-help").toggle();
	cmv.display.map.disableMap();
	cmv.display.sidebars.open('');
};
