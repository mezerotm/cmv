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
 * cmv.display.maps[0] = new cmv.display.map(0);
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

cmv.display.map = function(idNumber){
	this.id = document.getElementById(`map${idNumber}`);
	this.focus = false;

	// cmv properties
	this.request = cmv.display.map_request_template;

	//map polygons array to allow for deletion of polygons later
	this.polygons = [];

	// creates a new map on instantiation
	this.googleMap = new google.maps.Map(this.id, {
		zoom: 7,
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

	// adds dom listener
	google.maps.event.addDomListener(this.id.firstElementChild, 'click', function(){
		cmv.display.map.reFocus();
		this.focus = true;

		if(cmv.debugger.debug)
			console.log(this);
	}.bind(this));
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
	for(let i = 0; i < cmv.display.maps.length; i++)
		if(cmv.display.maps[i].focus)
			return cmv.display.maps[i];
};


//reset the request back to a default request for next processing
cmv.display.map.resetRequest = function() {
	activeMap = cmv.display.map.getActiveMap();

	//reset request to default values
	activeMap.request = {};
	activeMap.request.api = 'acs5';
	activeMap.request.year = '2014';
	activeMap.request.sublevel = true;
	//activeMap.request.variables = ['population'];
	activeMap.request.level = 'county';
}

//reset the active map display to a blank map (to avoid having too many polygons on one map, and to clean up visual of the map display)
cmv.display.map.resetActiveMapDisplay = function() {
	for(i = 0; i < cmv.activeMap.polygons.length; i++)
	{
		cmv.activeMap.polygons[i].setMap(null);
	}
}

/*cmv.display.map_request_template = {
		level: 'county',
		//zip: '30043',
		api: 'acs5',
		year: '2014',
		//state: 'GA',
		sublevel: true,
		variables: ['population']
	};*/