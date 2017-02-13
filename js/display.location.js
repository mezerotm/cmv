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

//for retrieving google places data programatically when user does not manually click a list item from autocomplete dropdown menu
cmv.display.location.location_service = new google.maps.places.PlacesService(document.getElementById("location_input"));;


cmv.display.location.place;
var placeTextVal;

//add listener to google places autocomplete object for when place is selected by user from dropdown list
google.maps.event.addListener(cmv.display.location.location_input, 'place_changed', function() {
	//log the value in the input box to use in validation later
	if(cmv.display.location.location_input.getPlace().geometry) //a place was found given user input
	{
		cmv.display.location.place = cmv.display.location.location_input.getPlace();
		placeTextVal = $('#location_input').val();
		console.log("Place Changed");
		console.log(cmv.display.location.place);
	}
	else
		console.log("Place not found.");
})

cmv.display.location.updatePlace = function()
{
	var input = document.getElementById("location_input");

	if(input.value == "" || input.value == null)
	{
		console.log("No input entered. Please enter a location");
	}
	else if(input.value != placeTextVal)
	{
		//the user input does not match what was stored the last time place was changed
		if(cmv.debugger.debug)
			console.log("Updating Place");

		var request = {
			query: input.value
		};

		//search for a place given the user's input
		cmv.display.location.location_service.textSearch(request, function(results, status) {
			if(status == google.maps.places.PlacesServiceStatus.OK) {
				var p = results[0];
				var request = {
					reference: p.reference
				};

				//get detailed information on the place found by the search
				cmv.display.location.location_service.getDetails(request, function(p, status) {
					if(status == google.maps.places.PlacesServiceStatus.OK) {

						//will hold the formatted output to be printed to the textbox shown to the user (the location_input textbox)
						addr_string = {
							city: "",
							state: "",
							zip: "",
							country: ""
						};

						for(i = 0; i < p.address_components.length; i++)
						{
							//compose string for showing in text box
							if(p.address_components[i].types[0] == "locality")
								addr_string.city = p.address_components[i].long_name;
							else if(p.address_components[i].types[0] == 'administrative_area_level_1')
								addr_string.state = p.address_components[i].long_name;
							else if(p.address_components[i].types[0] == 'postal_code')
								addr_string.zip = p.address_components[i].long_name;
							else if(p.address_components[i].types[0] == 'country')
								addr_string.country = p.address_components[i].long_name;
						}

						if(addr_string.country != "United States")
							console.log("That location is not within the United States, it is in " + addr_string.country + ". Please enter a valid location within the United States");
						else
						{
							cmv.display.location.place = p;
							cmv.display.location.placeTextVal = $("#location_input").val();
							//$("#location_input").val(JSON.stringify(cmv.display.location.place.address_components));
							

							//concatenate the parts of the addr_string into the final string to be put in the location_input textbox
							if(addr_string.city == "")
								final_addr_string = addr_string.state + " " + addr_string.zip + ", " + addr_string.country;
							else
								final_addr_string = addr_string.city + ", " + addr_string.state + " " + addr_string.zip + ", " + addr_string.country;

							$("#location_input").val(final_addr_string);
						}
					}
				});
			}
			else
				console.log("ERROR in textsearch");
		});
	}
	//else would be keeping place the same since nothing has changed and the input in the field is the same as it was when it last updated
}

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
	var zip;
	var state;
	

	/*try
	{*/
		//cmv.display.location.place = cmv.display.location.location_input.getPlace();
		//find zip and state within place information
		for(var i = 0; i < cmv.display.location.place.address_components.length; i++)
		{
			if(cmv.display.location.place.address_components[i].types[0] == 'postal_code') //zip code
				zip = parseInt(cmv.display.location.place.address_components[i].short_name);
			if(cmv.display.location.place.address_components[i].types[0] == 'administrative_area_level_1') //state
				state = cmv.display.location.place.address_components[i].short_name;
		}

		cmv.activeMap.request.zip = zip;
		cmv.activeMap.request.state = state;
		
		return true;
	/*}
	catch (err)
	{
		if(!cmv.display.location.location_input.getPlace())
			console.log("Invalid Place. User must select option from given dropdown menu when typing location input");
		else
			console.log(err.message);

		return false;
	}*/
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