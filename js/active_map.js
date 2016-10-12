function getActiveMap() {
	var active_map_holder = document.getElementById("active_map_holder");

	alert(active_map_holder.value);
}

function activateMap(map_num) {
	var active_map_holder = document.getElementById("active_map_holder");

	var map1 = document.getElementById("map1_shadow");
	var map2 = document.getElementById("map2_shadow");
	var map3 = document.getElementById("map3_shadow");
	var map4 = document.getElementById("map4_shadow");

	resetButtons();
	//make the button that corresponds to the active map have bolded text
	if(map_num == 1) {
		active_map_holder.value = "1";
		map1.style.boxShadow = " 2px 2px 2px #c9caca";
	}
	else if(map_num == 2) {
		active_map_holder.value = "2";
		map2.style.boxShadow = " 2px 2px 2px #c9caca";
	}
	else if(map_num == 3) {
		active_map_holder.value = "3";
		map3.style.boxShadow = " 2px 2px 2px #c9caca";
	}
	else if(map_num == 4){
		active_map_holder.value = "4";
		map4.style.boxShadow = " 2px 2px 2px #c9caca";
	}
}

//reset all buttons to normal text styling
function resetButtons() {
	var map1 = document.getElementById("map1_shadow");
	var map2 = document.getElementById("map2_shadow");
	var map3 = document.getElementById("map3_shadow");
	var map4 = document.getElementById("map4_shadow");

	map1.style.boxShadow = "0px 0px 0px white";
	map2.style.boxShadow = "0px 0px 0px white";
	map3.style.boxShadow = "0px 0px 0px white";
	map4.style.boxShadow = "0px 0px 0px white";
}