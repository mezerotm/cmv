// create cmv module (This will reduce chances of variable clobber, and modularize our code)
var cmv = {
    // flag for debug output
    debug: true,

    // citySDK modules
    sdkModule: new CitySdk(),
    censusModule: new CensusModule("c83e06ec87c35c0d3ffb0f6d7640afbf52b7071c"),

    // census data default requests
    level: 'county',
    zip: '30043',
    api: 'acs5',
    year: '2014',
    state: 'GA',
    sublevel: true,

    // toggles to prevent duplicate requests
    geoRequestToggle: false,
    apiRequestToggle: false,

    // determines the data that will displayed on the selected map
    userInput: 'population',

    // 2D array containing maps, and they're related polygon data
    polygonMaps: [[0], [0], [0], [0]],

    // sets the level of cords a tract will have
    polygonDetail: 20,

    /*
     * geoCallBack : This is the callback function that responds to the responses
     * from the geographical based api of the City SDK.
     * response: The JSON response from the City SDK
     */
    geoCallBack(response){
        if(response && this.geoRequestToggle){

            let featuresArray = response.features;

            // this is the variable being converted from, something like income, to the SKD key of B19013_001E
            let censusVarsMap = new CensusVariablesMap();
            let convertedVariable = censusVarsMap.getVariableFromValue(this.userInput);

            // Step 1: Determines the array of colors
            let colors = ["red", "pink", "yellow", "blue", "green" ];
            let colorRange = 5;

            // Step 2: Determine the range
            let minMaxValue = (function(){
                // setting the highest and lowest variables to measure all other variables against
                let minVal, maxVal;

                let variablesArray = [];

                //Setting up an object to return the minimum and maximum values.
                let values = [];

                // pushes values ito variables array
                featuresArray.forEach(function(features){
                    let points = features.properties[convertedVariable];
                    variablesArray.push(points);
                });

                minVal = Math.min.apply(null, variablesArray);
                maxVal = Math.max.apply(null, variablesArray);

                values.push({ minimum: minVal, maximum: maxVal });

                return values;
            })();

            // Step 3: Create the intervals
            let intervals = (function(){
                //An array to hold the array of objects for the lower and upper bounds.
                let intervals = [];

                //Setting out the variables for the max and min values.
                let max = minMaxValue[0].maximum;
                let min = minMaxValue[0].minimum;

                //Calculating the entire length from the max and min values.
                let length = max - min;

                //Determining the interval value
                let intervalValue = length / colorRange;

                //Using a for loop to push the lower/upper bounds into the intervals array.
                colors.forEach(function(){
                    intervals.push({ lower: min, upper: min + intervalValue })
                    min = min + intervalValue;
                });

                return intervals;
            })();

            // Step 4: Assign colors to tract
            let variablesArray = [];

            featuresArray.forEach(function(features){
               let dataPoint =  features.properties[convertedVariable];
               let colorValue;

               for(let i = 0; i < colorRange; i++){
                   if(dataPoint >= intervals[i].lower && dataPoint < intervals[i].upper)
                       colorValue = colors[i];
                   else
                       colorValue = colorRange;

                   variablesArray.push({value: dataPoint, color: colorValue});
               }
            });

            // clear active map drawing
            let activeMap = document.getElementById('active_map_holder').value;
            this.polygonMaps = [[0], [0], [0], [0]];

            // draw on to map
            featuresArray.forEach(function(tract){
                let coords = [];
                tract.geometry.coordinates[0].forEach(function(geoCord){
                    if((geoCord % this.polygonDetail) === 1)
                        coords.push({lat: tract.geometry.coordinates[0][geoCord][1], lng: tract.geometry.coordinates[0][geoCord][0]});
                });

                let mapOverlay = new google.maps.Polygon({
                    paths: coords,
                    strokeOpacity: 0.75,
                    strokeWeight: 2,
                    fillColor:  tract.color,
                    fillOpacity: 0.75
                });

                // TEMPORARY: creating a new map on every call is inefficient, i did this to remove dependency from './active_map.js'
                // todo: overhaul './active_map.js' to retain modular dependency
                mapOverlay.setMap(new google.maps.Map(document.getElementById(`map${activeMap}`), {
                    zoom: 7,
                    center: {lat: 33.895, lng: -84.210},
                    mapTypeControlOptions: {
                        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain']
                    }
                }));

                // todo: do checks to see if this 2D array works, and is properly pushing
                this.polygonMaps[activeMap].push(polyShape);
            });

        }else if(!this.geoRequestToggle && this.debug) {
            console.log('duplicate geoRequest callback')
        }else if(this.debug){
            console.log("Error: geo callback did not get a valid response");
            return false;
        }
        this.geoRequestToggle = true;
    },

    /*
     * dataCallBack : This is the callback function that responds to the responses
     * from the census data based api of the City SDK.
     * response: The JSON response from the City SDK
     */
    dataCallBack(response){
        if(!this.apiRequestToggle && this.debug) {
            console.log('duplicate apiRequest callback')
        }else if(this.debug){
            console.log("Error: data callback did not get a valid response");
            return false;
        }
        this.apiRequestToggle = true;
    },

    /*
     * retrieveData : This function is called by the submit button to connect with the City
     * SDK and obtain the data.
     */
     retrieveData(){
        this.geoRequestToggle = true;
        this.apiRequestToggle = true;

        // get checkboxes from the web page
        let checkBoxes = document.getElementsByName("censusVar");

        // configure the census data request
        let request = {
            level: this.level,
            zip: this.zip,
            api: this.api,
            year: this.year,
            state: this.state,
            sublevel: this.subLevel,
        };

        // processes each checkbox and determines which boxes have been checked
        let checkedBoxes = [];
        checkBoxes.forEach(function(box){
            if(box.checked){
                checkedBoxes.push(box.value);
            }
        });

        // fill the census data request with the variables selected by the user
        if(checkBoxes)
            request.variables = checkedBoxes;
        else
            request.variables = ['population'];


        this.userInput = request.variables[0];

        // This request is used to get geographical data
        this.censusModule.geoRequest(request, this.geoCallBack);

        // This request is used to get the data to correlate with the Geo location data
        this.censusModule.apiRequest(request, this.dataCallBack);

        console.log(this);
    }
};
