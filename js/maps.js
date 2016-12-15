//this is just a testing file, remove it when the tests are done


//listeners
google.maps.event.addDomListener(window, 'load', initMaps);

var page_maps = [];

//global constants
const var_locations = new google.maps.LatLng(-28, 137);
const map_options = {
		center: var_locations,
		zoom: 4,
		scrollwheel: false
	};
const map_style = {
	fillColor: 'green',
	strokeWeight: 1
}
const num_maps = 16;

//functions
function initMaps()
{
	//array of all map holders in the page
	var map_holders = [ 
		document.getElementById("map1_holder"),
		document.getElementById("map2_holder"),
		document.getElementById("map3_holder"),
		document.getElementById("map4_holder"),
		document.getElementById("map5_holder"),
		document.getElementById("map6_holder"),
		document.getElementById("map7_holder"),
		document.getElementById("map8_holder"),
		document.getElementById("map9_holder"),
		document.getElementById("map10_holder"),
		document.getElementById("map11_holder"),
		document.getElementById("map12_holder"),
		document.getElementById("map13_holder"),
		document.getElementById("map14_holder"),
		document.getElementById("map15_holder"),
		document.getElementById("map16_holder"),
	];

	

	
	for (var i = 0; i < num_maps; i++)
	{
		var map = new google.maps.Map(map_holders[i], map_options);
		page_maps[i] = map;
	}

	google.maps.event.addListener(page_maps[0], 'mousedown', function() {activateMap(0)});
	google.maps.event.addListener(page_maps[1], 'mousedown', function() {activateMap(1)});
	google.maps.event.addListener(page_maps[2], 'mousedown', function() {activateMap(2)});
	google.maps.event.addListener(page_maps[3], 'mousedown', function() {activateMap(3)});
	google.maps.event.addListener(page_maps[4], 'mousedown', function() {activateMap(4)});
	google.maps.event.addListener(page_maps[5], 'mousedown', function() {activateMap(5)});
	google.maps.event.addListener(page_maps[6], 'mousedown', function() {activateMap(6)});
	google.maps.event.addListener(page_maps[7], 'mousedown', function() {activateMap(7)});
	google.maps.event.addListener(page_maps[8], 'mousedown', function() {activateMap(8)});
	google.maps.event.addListener(page_maps[9], 'mousedown', function() {activateMap(9)});
	google.maps.event.addListener(page_maps[10], 'mousedown', function() {activateMap(10)});
	google.maps.event.addListener(page_maps[11], 'mousedown', function() {activateMap(11)});
	google.maps.event.addListener(page_maps[12], 'mousedown', function() {activateMap(12)});
	google.maps.event.addListener(page_maps[13], 'mousedown', function() {activateMap(13)});
	google.maps.event.addListener(page_maps[14], 'mousedown', function() {activateMap(14)});
	google.maps.event.addListener(page_maps[15], 'mousedown', function() {activateMap(15)});

}


function drawOnMap()
{
	var map_num = document.getElementById("active_map_holder").value;
	var map = page_maps[map_num - 1];
	map.data.setStyle(map_style);

	// Define the LatLng coordinates for the outer path.
  var outerCoords = [
    {lat: -32.364, lng: 153.207}, // north west
    {lat: -35.364, lng: 153.207}, // south west
    {lat: -35.364, lng: 158.207}, // south east
    {lat: -32.364, lng: 158.207}  // north east
  ];

  // Define the LatLng coordinates for an inner path.
  var innerCoords1 = [
    {lat: -33.364, lng: 154.207},
    {lat: -34.364, lng: 154.207},
    {lat: -34.364, lng: 155.207},
    {lat: -33.364, lng: 155.207}
  ];

  // Define the LatLng coordinates for another inner path.
  var innerCoords2 = [
    {lat: -33.364, lng: 156.207},
    {lat: -34.364, lng: 156.207},
    {lat: -34.364, lng: 157.207},
    {lat: -33.364, lng: 157.207}
  ];

	map.data.loadGeoJson(
            'https://storage.googleapis.com/mapsdevsite/json/google.json');
}

function clearMapData()
{
	var map_num = document.getElementById("active_map_holder").value;
	var map = page_maps[map_num - 1];

	var callback = function(feature)
	{
		map.data.remove(feature);
	}
	map.data.forEach(callback);
}

function activateMap(map_num)
{
	var active_map_holder = document.getElementById("active_map_holder");

	if(map_num < 16 && map_num >= 0)
		active_map_holder.value = map_num + 1;
	else
		alert("Invalid active map");
}