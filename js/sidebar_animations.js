function closeSidebars()
{
	//close all sidebars to prepare the next sidebar selected to be opened
	document.getElementById("widgetbar-configuration").style.display = "none";
	document.getElementById("widgetbar-configuration").style.width = "0px";
	document.getElementById("widgetbar-population").style.display = "none";
	document.getElementById("widgetbar-population").style.width = "0px";
	document.getElementById("widgetbar-demographic").style.display = "none";
	document.getElementById("widgetbar-demographic").style.width = "0px";
	document.getElementById("widgetbar-income").style.display = "none";
	document.getElementById("widgetbar-income").style.width = "0px";
	document.getElementById("widgetbar-crime").style.display = "none";
	document.getElementById("widgetbar-crime").style.width = "0px";
	document.getElementById("widgetbar-transportation").style.display = "none";
	document.getElementById("widgetbar-transportation".style.width = "0px";
	document.getElementById("widgetbar-education").style.display = "none";
	document.getElementById("widgetbar-education").style.width = "0px";
}

function openSidebar(sidebar_id)
{
	closeSidebars();
	document.getElementById(sidebar_id).style.display = "block";
	document.getElementById(sidebar_id).style.width = "200px";

}