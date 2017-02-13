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
	//console.log(cmv.display.location.location_input.getPlace());

		if(cmv.display.location.setPlace())
		{
			if(cmv.debugger.debug)
				console.log(cmv.activeMap.request.city);
			return true;
		}
		else
			return false;
};

//set zip code
cmv.display.location.setPlace = function()
{
	var place;
	var zip;
	var state;
	place = null; //the place that is being sent to the citysdk request

	try
	{
		place = cmv.display.location.location_input.getPlace();
		//find zip and state within place information
		for(var i = 0; i < place.address_components.length; i++)
		{
			if(place.address_components[i].types[0] == 'postal_code') //zip code
				zip = parseInt(place.address_components[i].short_name);
			if(cmv.display.location.location_input.getPlace().address_components[i].types[0] == 'administrative_area_level_1') //state
				state = cmv.display.location.location_input.getPlace().address_components[i].short_name;
		}

		cmv.activeMap.request.zip = zip;
		cmv.activeMap.request.state = state;
		
		return true;
	}
	catch (err)
	{
		if(!cmv.display.location.location_input.getPlace())
			console.log("Invalid Place. User must select option from given dropdown menu when typing location input");
		else
			console.log(err.message);

		return false;
	}
};

//set city
/*cmv.display.location.setCity = function()
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
};*/

//set state ****NOW INCLUDED IN SETPLACE METHOD***
/*cmv.display.location.setState = function()
{
	var state;

	try
	{
		//find the state in the place object
		for(var i = 0; i < cmv.display.location.location_input.getPlace().address_components.length; i++)
		{
			if(cmv.display.location.location_input.getPlace().address_components[i].types[0] == 'administrative_area_level_1')
				state = cmv.display.location.location_input.getPlace().address_components[i].short_name;
		}
		//set the state of the citysdk request
		cmv.activeMap.request.state = state;
	}
	catch(err)
	{
		if(!cmv.display.location.location_input.getPlace())
			console.log("Invalid Place. User must select option from given dropdown menu when typing location input");
		else
			console.log(err.message);
	}
};*/

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
/*cmv.display.location.setCountry = function()
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
};*/