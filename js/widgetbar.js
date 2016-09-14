function toggleWidget(widgetbar_tab) {



  var this_sidebar = document.getElementById(widgetbar_tab);


  if(this_sidebar.className == "widgetbar-page") {
  	closeActiveSidebars();
    this_sidebar.className += " active";
    updateMapSize("active");
	}
  else {
  	closeActiveSidebars();
  	updateMapSize("inactive");
  }
}

function closeActiveSidebars() {
	var active_widgetbars = document.getElementsByClassName("widgetbar-page active");
  	for(var i = 0; i < active_widgetbars.length; i++) {
  		active_widgetbars[i].className = "widgetbar-page";
  	}
}



function updateMapSize(sidebar_state) {
	var map_holder = document.getElementById("Maps_container");
  var top_panel = document.getElementById("top-panel");

	if(sidebar_state == "active") {
		map_holder.style.width = "calc(100% - 260px)";
    top_panel.style.width = "calc(100% - 260px)";
	}
	else {
		map_holder.style.width = "calc(100% - 48px)";
    top_panel.style.width = "calc(100% - 48px)";
	}
	resizeMaps();
}
