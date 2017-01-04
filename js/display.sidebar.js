/*
 * display/sidebar.js
 *
 */

cmv.display.sidebars.open = function(pageName){
	let activeClass = document.getElementsByClassName('sidepage active');

	// open and close pages
	if(cmv.display.sidebars.isOpened !== pageName){
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
