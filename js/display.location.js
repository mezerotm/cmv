//hold all data pertaining to user location input for the map data
cmv.display.location = {};

//the settings for the autocomplete google places variable
cmv.display.location.input_settings = {
	types:['(regions)'],
	componentRestrictions: {country: 'us'}
};

//the google places autocomplete variable that allows for user input and adds autocomplete functionality and input validation (partially)
cmv.display.location.location_input = new google.maps.places.Autocomplete(
	document.getElementById('location_input'),
	cmv.display.location.input_settings
	);

//set the variables in the citysdk data request to the values input by the user using the google places api
cmv.display.location.setLocationDetails = function()
{
	console.log(cmv.display.location.location_input.getPlace());
	cmv.display.location.setZip();
	//cmv.display.location.setCity();
	cmv.display.location.setState();
	//cmv.display.location.setCounty();
	//cmv.display.location.setCountry();

	console.log(cmv.activeMap.request.city);
};

//set zip code
cmv.display.location.setZip = function()
{
	zip = null;

	for(var i = 0; i < cmv.display.location.location_input.getPlace().address_components.length; i++)
	{
		if(cmv.display.location.location_input.getPlace().address_components[i].types[0] == 'postal_code')
			zip = parseInt(cmv.display.location.location_input.getPlace().address_components[i].short_name);
	}

	if(zip != null)
		cmv.activeMap.request.zip = zip;
	else
		console.log("Invalid zip code");
};

//set city
cmv.display.location.setCity = function()
{
	city = null;

	for(var i = 0; i < cmv.display.location.location_input.getPlace().address_components.length; i++)
	{
		if(cmv.display.location.location_input.getPlace().address_components[i].types[0] == 'locality')
			city = cmv.display.location.location_input.getPlace().address_components[i].short_name;
	}

	if(city != null)
		cmv.activeMap.request.city = city;
	else
		console.log("Invalid city");
};

//set state
cmv.display.location.setState = function()
{
	state = null;

	for(var i = 0; i < cmv.display.location.location_input.getPlace().address_components.length; i++)
	{
		if(cmv.display.location.location_input.getPlace().address_components[i].types[0] == 'administrative_area_level_1')
			state = cmv.display.location.location_input.getPlace().address_components[i].short_name;
	}

	if(state != null)
		cmv.activeMap.request.state = state;
	else
		console.log("Invalid state");
};

//set county
/*cmv.display.location.setCounty = function()
{
	county = null;

	for(var i = 0; i < cmv.display.location.location_input.getPlace().address_components.length; i++)
	{
		if(cmv.display.location.location_input.getPlace().address_components[i].types[0] == 'administrative_area_level_2')
		{
			temp_string = parseInt(cmv.display.location.location_input.getPlace().address_components[i].short_name);
			temp_string
		}
	}

	if(state != null)
		cmv.activeMap.request.county = county;
	else
		console.log("Invalid county");
};*/

//set country
cmv.display.location.setCountry = function()
{
	country = null;

	for(var i = 0; i < cmv.display.location.location_input.getPlace().address_components.length; i++)
	{
		if(cmv.display.location.location_input.getPlace().address_components[i].types[0] == 'country')
			country = parseInt(cmv.display.location.location_input.getPlace().address_components[i].short_name);
	}

	if(country != null)
		cmv.activeMap.request.country = country;
	else
		console.log("Invalid country");
};