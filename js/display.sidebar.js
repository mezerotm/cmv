/*
 * display/sidebar.js
 *
 */

cmv.display.sidebar = function(self){

};

let sidebarToggle = function(){
	console.log(this);
};


// Description: Checks current `sidebar_tab` for `active` flags and toggles that flag
// function toggleWidget(block, sidebar_tab){
// 	var this_sidebar = document.getElementById(sidebar_tab);
//
// 	if(this_sidebar.className == "sidebar-page"){
// 		closeActiveSidebars();
// 		this_sidebar.className += " active";
// 		updateMapSize(block, "active");
// 	}
// 	else{
// 		closeActiveSidebars(block);
// 		updateMapSize(block, "inactive");
// 	}
// }
//
// // Description: Cycles through all the `sidebar-page` classes and removes any `active` flags
// function closeActiveSidebars(){
// 	var active_sidebars = document.getElementsByClassName("sidebar-page active");
// 	var sidebar_tab_background = document.getElementsByClassName("sidebar-tab");
//
// 	for(var i = 0; i < active_sidebars.length; i++){
// 		active_sidebars[i].className = "sidebar-page";
// 	}
//
// 	for(var i = 0; i < sidebar_tab_background.length; i++){
// 		sidebar_tab_background[i].style.background = null;
// 	}
// }
//
// // Description: Toggles right widget bar pages to display
// function updateMapSize(block, sidebar_state){
// 	var map_holder = document.getElementById("map_container");
// 	var top_panel = document.getElementById("top-panel");
// 	var side_holder = document.getElementById("sidebar-tab-placeholder");
//
// 	if(sidebar_state == "active"){
// 		top_panel.style.width = "calc(100% - 257px)";
// 		map_holder.style.width = "calc(100% - 261px)";
// 		//side_holder.style.right = "257px";
// 		block.style.background = "#fff";
// 	}
// 	else{
// 		map_holder.style.width = "calc(100% - 50px)";
// 		top_panel.style.width = "calc(100% - 46px)";
// 		//side_holder.style.right = "46px";
// 		block.style.background = "#f1f3f6";
// 	}
// 	resizeMaps();
// }
