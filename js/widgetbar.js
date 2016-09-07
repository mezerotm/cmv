function toggleWidget(widgetbar_tab) {

  

  var this_sidebar = document.getElementById(widgetbar_tab);


  if(this_sidebar.className == "widgetbar-page") {
  	closeActiveSidebars();
    this_sidebar.className += " active";
	}
  else {
  	closeActiveSidebars();
  }
}

function closeActiveSidebars() {
	var active_widgetbars = document.getElementsByClassName("widgetbar-page active");
  	for(var i = 0; i < active_widgetbars.length; i++) {
  		active_widgetbars[i].className = "widgetbar-page";
  	}
}