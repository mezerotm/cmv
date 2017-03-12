/*
 * display/topbar.js
 *
 */

cmv.display.topbar.mapContainer = document.getElementById('map-container');
cmv.display.topbar.progressBar = document.getElementById('progress-bar');

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

cmv.display.topbar.ProgressBar = false;

cmv.display.topbar.ProgressBarStart = function(){
	if(!cmv.display.topbar.ProgressBar){
		cmv.display.topbar.ProgressBar = true;
		let width = 0;
		cmv.display.topbar.ProgressBarStart.timer = setInterval(frame, 35);
		function frame(){
			if(width >= 100){
				width = 0;
			}else{
				width++;
				cmv.display.topbar.progressBar.style.width = width + '%';
			}
		}
	}
};

//This function will contain the code for the date on the index page. 
cmv.display.showDate = function(){
  var d = new Date();
  document.getElementById("date").innerHTML = d.toDateString();
}();






