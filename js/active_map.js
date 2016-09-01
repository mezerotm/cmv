function getActiveMap() {
	var active_map_holder = document.getElementById("active_map_holder");

	alert(active_map_holder.value);
}

function activateMap(map_num) {
	var active_map_holder = document.getElementById("active_map_holder");

	var map1btn = document.getElementById("map1_activate");
	var map2btn = document.getElementById("map2_activate");
	var map3btn = document.getElementById("map3_activate");
	var map4btn = document.getElementById("map4_activate");

	resetButtons();

	if(map_num == 1) {
		active_map_holder.value = "1";
		map1btn.style.fontWeight = "bold";
	}
	else if(map_num == 2) {
		active_map_holder.value = "2";
		map2btn.style.fontWeight = "bold";
	}
	else if(map_num == 3) {
		active_map_holder.value = "3";
		map3btn.style.fontWeight = "bold";
	}
	else if(map_num == 4){
		active_map_holder.value = "4";
		map4btn.style.fontWeight = "bold";
	}
}

function resetButtons() {
	var map1btn = document.getElementById("map1_activate");
	var map2btn = document.getElementById("map2_activate");
	var map3btn = document.getElementById("map3_activate");
	var map4btn = document.getElementById("map4_activate");

	map1btn.style.fontWeight = "normal";
	map2btn.style.fontWeight = "normal";
	map3btn.style.fontWeight = "normal";
	map4btn.style.fontWeight = "normal";
}