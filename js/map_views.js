function updateMapViews() {

	var map1 = document.getElementById("map1");
	var map2 = document.getElementById("map2");
	var map3 = document.getElementById("map3");
	var map4 = document.getElementById("map4");
	var input = document.getElementById("map-views");

	var map1btn = document.getElementById("map1_activate");
	var map2btn = document.getElementById("map2_activate");
	var map3btn = document.getElementById("map3_activate");
	var map4btn = document.getElementById("map4_activate");

	resetMapVisible();
	
	if(input.value == "1") {
		map2.style.display = "none";
		map3.style.display = "none";
		map4.style.display = "none";

		map1.style.width = "calc(100% - 10px)";
		map1.style.height = "736px";

		//make active_map buttons for maps that are not being shown unable to be clicked
		map2btn.disabled = true;
		map3btn.disabled = true;
		map4btn.disabled = true;
	}
	else if(input.value == "2") {
		map3.style.display = "none";
		map4.style.display = "none";

		map1.style.width = "calc(50% - 10px)";
		map1.style.height = "736px";
		map2.style.width = "calc(50% - 10px)";
		map2.style.height = "736px";

		//make active_map buttons for maps that are not being shown unable to be clicked
		map3btn.disabled = true;
		map4btn.disabled = true;
	}
	else {
		map1.style.width = "calc(50% - 10px)";
		map1.style.height = "363px";
		map2.style.width = "calc(50	% - 10px)";
		map2.style.height = "363px";
		map3.style.width = "calc(50% - 10px)";
		map3.style.height = "363px";
		map4.style.width = "calc(50% - 10px)";
		map4.style.height = "363px";
	}

	resizeMaps();
}

//reset map visibility
function resetMapVisible() {
	var map1 = document.getElementById("map1");
	var map2 = document.getElementById("map2");
	var map3 = document.getElementById("map3");
	var map4 = document.getElementById("map4");

	var map1btn = document.getElementById("map1_activate");
	var map2btn = document.getElementById("map2_activate");
	var map3btn = document.getElementById("map3_activate");
	var map4btn = document.getElementById("map4_activate");

	map1.style.display = "inline-block";
	map2.style.display = "inline-block";
	map3.style.display = "inline-block";
	map4.style.display = "inline-block";

	map1btn.disabled = false;
	map2btn.disabled = false;
	map3btn.disabled = false;
	map4btn.disabled = false;
}

//resize the google maps themselves to match the windows/divs they are in*
function resizeMaps() {
	var map1 = document.getElementById("map1");
	var map2 = document.getElementById("map2");
	var map3 = document.getElementById("map3");
	var map4 = document.getElementById("map4");

	google.maps.event.trigger(map1, 'resize');
	google.maps.event.trigger(map2, 'resize');
	google.maps.event.trigger(map3, 'resize');
	google.maps.event.trigger(map4, 'resize');
}