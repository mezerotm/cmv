/*
 * display/topbar.js
 *
 */

cmv.display.topbar.mapContainer = document.getElementById('map-container');

// is used to determine weather a page is open or not
cmv.display.sidebar.isOpened = undefined;

// updates map views
cmv.display.topbar.updateMapView = function(self){
	for(let i = 0; i < cmv.display.maps.length; i++){
		switch(Number(self.value)){
			case 1:
				cmv.display.topbar.mapContainer.style.height = 'calc(197% - 28px)';

				for(let i = 1; i < cmv.display.maps.length; i++)
					cmv.display.maps[i].id.className = `no-display`;
				break;
			case 2:
				cmv.display.topbar.mapContainer.style.height = 'calc(197% - 28px)';

				for(let i = 2; i < cmv.display.maps.length; i++){
					cmv.display.maps[i].id.className = `no-display`;
				}
				for(let i = 0; i < 2; i++){
					cmv.display.maps[i].id.className = null;
				}
				break;
			case 4:
				cmv.display.topbar.mapContainer.style.height = 'calc(100% - 28px)';

				for(let i = 0; i < cmv.display.maps.length; i++){
					cmv.display.maps[i].id.className = null;
				}
				break;
		}

		// this redraws the map and re centers it
		let mapCenter = cmv.display.maps[i].googleMap.getCenter();
		google.maps.event.trigger(cmv.display.maps[i].googleMap, 'resize');
		cmv.display.maps[i].googleMap.setCenter(mapCenter);
	}

	if(!cmv.display.sidebar.isOpened)
		cmv.display.topbar.mapContainer.style.width = 'calc(100% - 45px)';
	else
		cmv.display.topbar.mapContainer.style.width = 'calc(100% - 290px)';
};

// -----------------------------------------

cmv.display.topbar.setApi = function(api){
	if(cmv.api.approved.indexOf(api) === -1) return false;
	document.getElementById("api").value = api;
	cmv.display.topbar.setYears();
};

//populate years select list
cmv.display.topbar.setYears = function(){
	let select = document.getElementById("years");
	let years = cmv.census.availableDatasets[document.getElementById("api").value];

	$("#years").empty();

	for(let i = 0; i < years.length; i++)
		select.options[select.options.length] = new Option(years[i], years[i]);
};

//set initial state of APIs and years select lists
(function(){
	//populate APIs
	let select = document.getElementById("api");
	let approved = cmv.api.approved;

	for(let i = 0; i < approved.length; i++)
		select.options[select.options.length] = new Option(approved[i], approved[i]);

	cmv.display.topbar.setYears();
})();

document.getElementById("api").addEventListener("change", function(){
	cmv.display.topbar.setYears();
});






