function closeSidebars() {
	document.getElementById("input_main").style.display = "none";
	document.getElementById("output_demographic").style.display = "none";
	document.getElementById("output_income").style.display = "none";
	document.getElementById("output_crime").style.display = "none";
	document.getElementById("output_transportation").style.display = "none";
	document.getElementById("output_education").style.display = "none";
}
function showInputMain() {
	closeSidebars();
	document.getElementById("input_main").style.display = "block";
}
function showDemographic() {
	closeSidebars();
	document.getElementById("output_demographic").style.display = "block";
}
function showIncome() {
	closeSidebars();
	document.getElementById("output_income").style.display = "block";
}
function showCrime() {
	closeSidebars();
	document.getElementById("output_crime").style.display = "block";
}
function showTransportation() {
	closeSidebars();
	document.getElementById("output_transportation").style.display = "block";
}
function showEducation() {
	closeSidebars();
	document.getElementById("output_education").style.display = "block";
}
/*update which maps are shown to the user based on their view preset selection (dropdown menu)*/
function mapViewsChange() {
	var num = document.getElementById("map_view_list").value;
	if(num == "1") {
		showOneMap();
	}
	else if(num == "2") {
		showTwoMap();
	}
	else if(num == "4"){
		showFourMap();
	}
}
/*initialize all parts of the page
	-initialize the maps
	-initialize the default sidebar (input_main)
*/
function init_page() {
	
	//initializes the sidebar view to show the input_main sidebar by default
	document.getElementById("input_main").style.display = "block"
	
	//initialize map1 to be the active map
	map1Active();
	
	//initialize the maps to show up on the page
      var var_location = new google.maps.LatLng(45.430817,12.331516);

      var var_mapoptions = {
        center:var_location,
        zoom: 14
      }

      var map1 = new google.maps.Map(document.getElementById("map1"), var_mapoptions);
      var map2 = new google.maps.Map(document.getElementById("map2"), var_mapoptions);
      var map3 = new google.maps.Map(document.getElementById("map3"), var_mapoptions);
      var map4 = new google.maps.Map(document.getElementById("map4"), var_mapoptions);
      //end map initializations
}

/*show the help to the user (basic things like what their active tab is and how to get output data to show up on maps*/
function showHelp() {
	document.getElementById("help_div").style.height="auto";
	document.getElementById("help_div").style.padding="5px";
	document.getElementById("help_div").style.display="block";
}
/*close the help window that is currently visible to the user*/
function closeHelp() {
	document.getElementById("help_div").style.height="0";
	document.getElementById("help_div").style.padding="0";
	document.getElementById("help_div").style.display="none";
}

/*updates view to only show 1 map to user*/
function showOneMap() {
	/*reset active status of maps so that user does not have a hidden map as the active map*/
	map1Active();
	
	/*hide other maps*/
	document.getElementById("map2_container").style.display="none";
	document.getElementById("map3_container").style.display="none";
	document.getElementById("map4_container").style.display="none";
	
	/*make sure remaining map is visible*/
	document.getElementById("map1_container").style.display="block";
	
	/*resize the single remaining map*/
	document.getElementById("map1_container").style.width="97%";
	document.getElementById("map1_container").style.height="560px";
}

/*updates view to only show 2 maps to user*/
function showTwoMap() {
	/*reset active status of maps so that user does not have a hidden map as the active map*/
	map1Active();
	
	/*hide other maps*/
	document.getElementById("map3_container").style.display="none";
	document.getElementById("map4_container").style.display="none";
	
	/*make sure both maps are visible*/
	document.getElementById("map1_container").style.display="block";
	document.getElementById("map2_container").style.display="block";
	
	/*resize the 2 remaining maps*/
	document.getElementById("map1_container").style.width="48%";
	document.getElementById("map1_container").style.height="560px";
	document.getElementById("map2_container").style.width="48%";
	document.getElementById("map2_container").style.height="560px";
}

/*updates view to show 4 maps to user*/
function showFourMap() {
	/*make sure all maps are visible*/
	document.getElementById("map1_container").style.display="block";
	document.getElementById("map2_container").style.display="block";
	document.getElementById("map3_container").style.display="block";
	document.getElementById("map4_container").style.display="block";
	
	/*resize the 2 remaining maps*/
	document.getElementById("map1_container").style.width="48%";
	document.getElementById("map1_container").style.height="300px";
	document.getElementById("map2_container").style.width="48%";
	document.getElementById("map2_container").style.height="300px";
	document.getElementById("map3_container").style.width="48%";
	document.getElementById("map3_container").style.height="300px";
	document.getElementById("map4_container").style.width="48%";
	document.getElementById("map4_container").style.height="300px";
}

/*update which map tab is the active tab*/

function clearActiveTab() {/*reset all tabs to be not the active tab*/
	document.getElementById("map1_tab_btn").style.fontWeight="normal";
	document.getElementById("map1_tab_btn").style.fontSize="12px";
	document.getElementById("map2_tab_btn").style.fontWeight="normal";
	document.getElementById("map2_tab_btn").style.fontSize="12px";
	document.getElementById("map3_tab_btn").style.fontWeight="normal";
	document.getElementById("map3_tab_btn").style.fontSize="12px";
	document.getElementById("map4_tab_btn").style.fontWeight="normal";
	document.getElementById("map4_tab_btn").style.fontSize="12px";
}

function map1Active() {
	clearActiveTab();
	
	document.getElementById("map1_tab_btn").style.fontWeight="bold";
	document.getElementById("map1_tab_btn").style.fontSize="14px";
}
function map2Active() {
	clearActiveTab();
	
	document.getElementById("map2_tab_btn").style.fontWeight="bold";
	document.getElementById("map2_tab_btn").style.fontSize="14px";
}
function map3Active() {
	clearActiveTab();
	
	document.getElementById("map3_tab_btn").style.fontWeight="bold";
	document.getElementById("map3_tab_btn").style.fontSize="14px";
}
function map4Active() {
	clearActiveTab();
	
	document.getElementById("map4_tab_btn").style.fontWeight="bold";
	document.getElementById("map4_tab_btn").style.fontSize="14px";
}
/*end active map tab functions*/