/*
 * display/maps.js
 *
 */

/*
 * cmv.map(idNumber)
 *
 * This is a constructor for creating map objects
 * Creation of this object looks like
 *
 * cmv.display.maps[index] = new cmv.display.map(index);
 *
 * where the index a value from 0  - 3 indicating map location on the screen.
 */

 //template for empty map request
cmv.display.map_request_template = {
		level: 'county',
		//zip: '30043',
		api: 'acs5',
		year: '2014',
		//state: 'GA',
		sublevel: true,
		variables: ['population']
	};

/*
 * cmv.map(idNumber)
 *
 * This is a constructor for creating map objects
 * Creation of this object looks like
 *
 * cmv.display.maps[index] = new cmv.display.map(index);
 *
 * where the index a value from 0  - 3 indicating map location on the screen.
 */
cmv.display.map = function(idNumber){
	this.id = document.getElementById(`map${idNumber}`);
	this.idNum = idNumber;
	this.focus = false;

	// cmv properties
	this.request = cmv.display.map_request_template;

	//map polygons array to allow for deletion of polygons later
	this.polygons = [];

	// creates a new map on instantiation
	this.googleMap = new google.maps.Map(this.id, {
		zoom: 8,
		center: {lat: 32.1656220, lng: -82.9000750},
		streetViewControl: false,
		fullscreenControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			mapTypeIds: ['roadmap', 'terrain', 'silver']
		},
		// sets defualt map type ID
		mapTypeId: 'roadmap'
	});

  // adds custom styles from display.map.styles.js
  this.googleMap.mapTypes.set('silver', cmv.display.mapStyles.silver);


  // google map display properties
  this.googleProperties = new google.maps.Polygon({
    map: this.googleMap,
    strokeOpacity: 1.5,
    strokeWeight: 1,
    strokeColor: '#2D2E32',
    fillColor: '#2D2E32',
    fillOpacity: .75
  });

    // create map legend html div and add it to the map element
    var mapLegendDiv = document.createElement('div');
    mapLegendDiv.innerHTML = '<center><h3>Legend</h3></center>';
    mapLegendDiv.setAttribute("class", "maplegend");
    mapLegendDiv.setAttribute("id", "mapLegend" + idNumber);
    mapLegendDiv.style.display = "none";

   
   // get the maps container
    var mapContainer = document.getElementById('map' + idNumber);
    
    
    mapContainer.appendChild(mapLegendDiv);
    if(cmv.debugger.debug) console.log(mapContainer.innerHTML);
    // placing the map legend onto the map
    this.googleMap.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('mapLegend' + idNumber));
    
    // create map title
    // create map legend html div and add it to the map element
    var mapTitleDiv = document.createElement('div');
    mapTitleDiv.setAttribute("class", "mapTitle");
    mapTitleDiv.setAttribute("id", "mapTitle" + idNumber);
    mapTitleDiv.style.display = 'none';           // Hide
   
    mapContainer.appendChild(mapTitleDiv);
    if(cmv.debugger.debug) console.log(mapContainer.innerHTML);
    // placing the map legend onto the map
    this.googleMap.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('mapTitle' + idNumber));
        
       
  // adds dom listener
  google.maps.event.addDomListener(this.id.firstElementChild, 'click', function(){
    cmv.display.map.reFocus();
    this.focus = true;

    if(cmv.debugger.debug)
      console.log(this);
  }.bind(this));

	// center map
	this.centerMap = function(){
    let geocoder = new google.maps.Geocoder();
		let address = '30043';

		geocoder.geocode({'address': address}, function(results, status){
			if(status == 'OK'){

				//get latitude and longitude
				let lat = results[0].geometry.location.lat();
				let long = results[0].geometry.location.lng();

				// defualt zoom
				let zoom = 1;

				// sets zoom based off request level
				switch(this.request.level){
					case 'blockGroup':
            zoom = 10;
            break;
					case 'tract':
            zoom = 10;
            break;
					case 'county':
            zoom = 10;
            break;
					case 'state':
            zoom = 7;
            break;
					case 'us':
            zoom = 15;
            break;
					case 'place':
            zoom = 5;
            break;
				}

				this.googleMap.setZoom(zoom);
				this.googleMap.setCenter({lat: lat, lng: long});
			}else if(cmv.debugger.debug)
				console.log('cmv.display.map.centerMap: ' + status);
		}.bind(this));
  };

	//Loading indicator
	this.progressBar =
		{
			bar: new ProgressBar.Circle(this.id, {
				color: '#CDCDCD',
        status: 'inactive',
				duration: 500,
				// sets default to nothing
				svgStyle: {},
        strokeWidth: 99.9
			}),

			start: function(){
				let that = this;
				$("#map-container").find("td > svg").css("display", "block");
                let svgs = $("#map-container").find("td > svg");
                that.bar.status = 'active';
				function loop(){
					if(that.bar.value() <= .01 && that.bar.status == 'active')
						that.bar.animate(1, function(){
							that.bar.set(0);
						})
				}

				setInterval(loop, 100);
			},

			stop: function(){
				$("#map-container").find("td > svg").css("display", "none");
        this.bar.status = 'inactive';
        clearInterval();
			}
		}

};

// creates 4 total maps
for(let i = 0; i < 4; i++)
  cmv.display.maps[i] = new cmv.display.map(i);

// sets a default focus to the first map
cmv.display.maps[0].focus = true;

// removes focus on all map instances
cmv.display.map.reFocus = function(){
  cmv.display.maps.forEach(function(self){
    self.focus = false;
  })
};

// returns the current active map
cmv.display.map.getActiveMap = function(){
  if(cmv.activeMap == null) {
      for (let i = 0; i < cmv.display.maps.length; i++)
          if (cmv.display.maps[i].focus)
              return cmv.display.maps[i];
  }
  else
      return cmv.activeMap;
};

// returns the current active map number
cmv.display.map.getActiveMapNumber = function(){
  for(let i = 0; i < cmv.display.maps.length; i++)
    if(cmv.display.maps[i].focus)
      return i;
};



// disable all maps
cmv.display.map.disableMaps = function(){
  for(let i = 0; i < cmv.display.maps.length; i++)
    cmv.display.maps[i].googleMap.setOptions({draggable: false});

  // disable #mapviews
  $("#mapviews").prop("disabled", true);
};
//reset the request back to a default request for next processing
cmv.display.map.resetRequest = function() {
    activeMap = cmv.display.map.getActiveMap();
    activeMap.request = {};
    activeMap.request.api = 'acs5';
    activeMap.request.year = '2014';
    activeMap.request.sublevel = true;
    //activeMap.request.variables = ['population'];
    activeMap.request.level = 'county';

};

// enable all maps
cmv.display.map.enableMaps = function(){
  for(let i = 0; i < cmv.display.maps.length; i++)
    cmv.display.maps[i].googleMap.setOptions({draggable: true});
	//reset request to default values
	activeMap.request = {};
	activeMap.request.api = 'acs5';
	activeMap.request.year = '2014';
	activeMap.request.sublevel = true;
	//activeMap.request.variables = ['population'];
	activeMap.request.level = 'county';
};

//reset the active map display to a blank map (to avoid having too many polygons on one map, and to clean up visual of the map display)
cmv.display.map.resetActiveMapDisplay = function() {
	for(i = 0; i < cmv.activeMap.polygons.length; i++)
	{
		cmv.activeMap.polygons[i].setMap(null);
	}
        
        // remove the title on reload
        var titleControl = cmv.activeMap.googleMap.controls[google.maps.ControlPosition.TOP_CENTER];
        // this concoction came from inspecting the debugger. There must be a more straight-forward way to do this (crh)
        titleControl.b[0].style.display = "none"; // hide
        
        // remove the legend on reload
        var legendControl = cmv.activeMap.googleMap.controls[google.maps.ControlPosition.RIGHT_BOTTOM];
        // this concoction came from inspecting the debugger. There must be a more straight-forward way to do this (crh)
        legendControl.b[0].style.display = "none"; // hide
        
};
  // disable #mapviews
  $("#mapviews").prop("disabled", false);

/*cmv.display.map_request_template = {
		level: 'county',
		//zip: '30043',
		api: 'acs5',
		year: '2014',
		//state: 'GA',
		sublevel: true,
		variables: ['population']
	};*/
//console.log('zipCord:' + cmv.display.map.zipCodeConverter( cmv.display.maps[0].request.zip ) );


cmv.display.map.centerActiveMap = function()
{
    activeMap = cmv.activeMap;

    lat = cmv.display.location.place.geometry.location.lat();
    long = cmv.display.location.place.geometry.location.lng();

    console.log(activeMap.request.level)

    // sets zoom based off request level
    switch(activeMap.request.level){
        case 'blockGroup':
            zoom = 10;
            break;
        case 'tract':
            zoom = 10;
            break;
        case 'county':
            zoom = 10;
            break;
        case 'state':
            zoom = 7;
            break;
        case 'us':
            zoom = 15;
            break;
        case 'place':
            zoom = 5;
            break;
    }

    activeMap.googleMap.setCenter(new google.maps.LatLng(lat, long));
    console.log("Centered map")
};
