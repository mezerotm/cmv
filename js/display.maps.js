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
 * cmv.maps[0] = new cmv.map(0);
 */
cmv.display.map =  function(idNumber){
	this.id = document.getElementById(`map${idNumber}`);
	this.focus = false;

	// cmv properties
	this.request = {
		level: 'county',
		zip: '30043',
		api: 'acs5',
		year: '2014',
		state: 'GA',
		sublevel: true,
		variables: ['population']
	};

	// creates a new map on instantiation
	this.googleMap = new google.maps.Map(this.id, {
		zoom: 7,
		center: {lat: 33.895, lng: -84.210},
		mapTypeControlOptions: {
			mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain']
		}
	});

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

// sets the number of maps to display on the screen
// todo: currently the css is not dynamic enough to support any number less or more then 4
cmv.display.map.numberOfMaps = 4;

//initialize the map objects
for(let i = 0; i < cmv.display.map.numberOfMaps; i++)
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







