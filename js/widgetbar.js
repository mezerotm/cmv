// Description: Checks current `widgetbar_tab` for `active` flags and toggles that flag
function toggleWidget(block, widgetbar_tab) {
  var this_sidebar = document.getElementById(widgetbar_tab);

  if(this_sidebar.className == "widgetbar-page") {
  	closeActiveSidebars();
    this_sidebar.className += " active";
    updateMapSize(block, "active");
	}
  else {
  	closeActiveSidebars(block);
  	updateMapSize(block, "inactive");
  }
}

// Description: Cycles through all the `widgetbar-page` classes and removes any `active` flags
function closeActiveSidebars() {
	var active_widgetbars = document.getElementsByClassName("widgetbar-page active");
  var widgetbar_tab_background = document.getElementsByClassName("widgetbar-tab");

  	for(var i = 0; i < active_widgetbars.length; i++) {
  		active_widgetbars[i].className = "widgetbar-page";
  	}

    for(var i = 0; i < widgetbar_tab_background.length; i++) {
  		widgetbar_tab_background[i].style.background = null;
  	}
}

// Description: Toggles right widget bar pages to display
function updateMapSize(block, sidebar_state) {
	var map_holder = document.getElementById("Maps_container");
  var top_panel = document.getElementById("top-panel");
  var side_holder = document.getElementById("widgetbar-tab-placeholder");

	if(sidebar_state == "active") {
    top_panel.style.width = "calc(100% - 257px)";
		map_holder.style.width = "calc(100% - 261px)";
    //side_holder.style.right = "257px";
    block.style.background = "#fff";
	}
	else {
		map_holder.style.width = "calc(100% - 50px)";
    top_panel.style.width = "calc(100% - 46px)";
    //side_holder.style.right = "46px";
    block.style.background = "#f1f3f6";
	}
	resizeMaps();
}
