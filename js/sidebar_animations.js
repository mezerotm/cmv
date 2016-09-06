function closeSidebars()
{
	var sidebar1 = document.getElementById("widgetbar-configuration");
	var sidebar2 = document.getElementById("widgetbar-population");
	var sidebar3 = document.getElementById("widgetbar-demographic");
	var sidebar4 = document.getElementById("widgetbar-income");
	var sidebar5 = document.getElementById("widgetbar-crime");
	var sidebar6 = document.getElementById("widgetbar-transportation");
	var sidebar7 = document.getElementById("widgetbar-education");
	//close all sidebars to prepare the next sidebar selected to be opened
	sidebar1.style.width = "0px";
	sidebar1.style.display = "none";
	sidebar2.style.width = "0px";
	sidebar2.style.display = "none";
	sidebar3.style.width = "0px";
	sidebar3.style.display = "none";
	sidebar4.style.width = "0px";
	sidebar4.style.display = "none";
	sidebar5.style.width = "0px";
	sidebar5.style.display = "none";
	sidebar6.style.width = "0px";
	sidebar6.style.display = "none";
	sidebar7.style.width = "0px";
	sidebar7.style.display = "none";
}

function openSidebar1()
{
	closeSidebars();
	var sidebar = document.getElementById("widgetbar-configuration");
	sidebar.style.width = "200px";
	sidebar.style.display = "inline-block";

}

function openSidebar2()
{
	closeSidebars();
	var sidebar = document.getElementById("widgetbar-population");
	sidebar.style.width = "200px";
	sidebar.style.display = "inline-block";
}

function openSidebar3()
{
	closeSidebars();
	var sidebar = document.getElementById("widgetbar-demographic");
	sidebar.style.width = "200px";
	sidebar.style.display = "inline-block";
}

function openSidebar4()
{
	closeSidebars();
	var sidebar = document.getElementById("widgetbar-income");
	sidebar.style.width = "200px";
	sidebar.style.display = "inline-block";
}

function openSidebar5()
{
	closeSidebars();
	var sidebar = document.getElementById("widgetbar-crime");
	sidebar.style.width = "200px";
	sidebar.style.display = "inline-block";
}

function openSidebar6()
{
	closeSidebars();
	var sidebar = document.getElementById("widgetbar-transportation");
	sidebar.style.width = "200px";
	sidebar.style.display = "inline-block";
}

function openSidebar7()
{
	closeSidebars();
	var sidebar = document.getElementById("widgetbar-education");
	sidebar.style.width = "200px";
	sidebar.style.display = "inline-block";
}