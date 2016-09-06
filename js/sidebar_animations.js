function closeSidebars()
{
	//close all sidebars to prepare the next sidebar selected to be opened
	document.getElementById("widgetbar-configuration").style.width = "0px";
	document.getElementById("widgetbar-population").style.width = "0px";
	document.getElementById("widgetbar-demographic").style.width = "0px";
	document.getElementById("widgetbar-income").style.width = "0px";
	document.getElementById("widgetbar-crime").style.width = "0px";
	document.getElementById("widgetbar-transportation").style.width = "0px";
	document.getElementById("widgetbar-education").style.width = "0px";
}

function openSidebar(sidebar_num)
{
	closeSidebars();
	switch(sidebar_num)
	{
		case 1:
			document.getElementById("widgetbar-configuration").style.width = "200px";
		break;
		case 2:
			document.getElementById("widgetbar-population").style.width = "200px";
		break;
		case 3:
			document.getElementById("widgetbar-demographic").style.width = "200px";
		break;
		case 4:
			document.getElementById("widgetbar-income").style.width = "200px";
		break;
		case 5:
			document.getElementById("widgetbar-crime").style.width = "200px";
		break;
		case 6:
			document.getElementById("widgetbar-transportation").style.width = "200px";
		break;
		case 7:
			document.getElementById("widgetbar-education").style.width = "200px";
		break;
	}

}