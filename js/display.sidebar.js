/*
 * display/sidebar.js
 *
 */

// opens the desired page, closes all pages if no parameter
cmv.display.sidebar.open = function(pageName){
	let activeClass = document.getElementsByClassName('sidepage active');

	// open and close pages
	if(pageName && !cmv.display.sidebar.help.open.toggle && cmv.display.sidebar.isOpened !== pageName){
		for(let i = 0; i < activeClass.length; i++)
			activeClass[i].className = 'sidepage inactive';

		// activate specific sidepage
		document.getElementById(`sidepage-${pageName}`).className = 'sidepage active';
		cmv.display.sidebar.isOpened = pageName;

		// resize maps
		cmv.display.topbar.mapContainer.style.width = 'calc(100% - 290px)';

	}else{
		for(let i = 0; i < activeClass.length; i++)
			activeClass[i].className = 'sidepage inactive';
		cmv.display.sidebar.isOpened = undefined;

		// resize maps
		cmv.display.topbar.mapContainer.style.width = 'calc(100% - 45px)';
	}
};
