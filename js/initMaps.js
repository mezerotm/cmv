
var all_maps = [];

 function init_map() {
        //initialize the element that will track which map is the active map and set its default value
        var active_map_holder = document.getElementById("active_map_holder");
        activateMap(1);

        //initialize and set up maps for the page
        var var_location = new google.maps.LatLng(33.895,-84.210);

        var var_mapoptions = {
            zoom: 7,
            center:var_location,
            scrollwheel: false
        }

        all_maps[0] = new google.maps.Map(document.getElementById("map1"), var_mapoptions);
        all_maps[1] = new google.maps.Map(document.getElementById("map2"), var_mapoptions);
        all_maps[2] = new google.maps.Map(document.getElementById("map3"), var_mapoptions);
        all_maps[3] = new google.maps.Map(document.getElementById("map4"), var_mapoptions);

        /*all_maps[0].data.setStyle({
            fillColor: 'blue'
          });*/

        //make sure maps dynamically resize to fit windows whenever they are in an idle state
        google.maps.event.addDomListener(all_maps[0], 'idle', function() {
          google.maps.event.trigger(all_maps[0], 'resize');
        });
        google.maps.event.addDomListener(all_maps[1], 'idle', function() {
          google.maps.event.trigger(all_maps[1], 'resize');
        });
        google.maps.event.addDomListener(all_maps[2], 'idle', function() {
          google.maps.event.trigger(all_maps[2], 'resize');
        });
        google.maps.event.addDomListener(all_maps[3], 'idle', function() {
          google.maps.event.trigger(all_maps[3], 'resize');
        });

        google.maps.event.addListener(all_maps[0], 'mousedown', function() {activateMap(1)});
        google.maps.event.addListener(all_maps[1], 'mousedown', function() {activateMap(2)});
        google.maps.event.addListener(all_maps[2], 'mousedown', function() {activateMap(3)});
        google.maps.event.addListener(all_maps[3], 'mousedown', function() {activateMap(4)});

        //add listener so that whenever maps are idle, they resize to fit the current winow
       /* google.maps.event.trigger(map1, 'resize');
        google.maps.event.trigger(map2, 'resize');
        google.maps.event.trigger(map3, 'resize');
        google.maps.event.trigger(map4, 'resize');*/

        //marker.addListener('click', function()
      }

      google.maps.event.addDomListener(window, 'load', init_map);/*creates a listener to where it loads the maps when the page finishes loading*/

//=======
// function init_map() {
//       var var_location = new google.maps.LatLng(33.957,-84.282);

//       var var_mapoptions = {
//         center:var_location,
//         zoom: 11
//       }

//       var map1 = new google.maps.Map(document.getElementById("map1"), var_mapoptions);
//       //The below maps, html code, has been pulled for the time being.
//       // var map2 = new google.maps.Map(document.getElementById("map2"), var_mapoptions);
//       // var map3 = new google.maps.Map(document.getElementById("map3"), var_mapoptions);
//       // var map4 = new google.maps.Map(document.getElementById("map4"), var_mapoptions);

//       map1.data.setStyle({
//           fillColor: 'blue'
//         });
//     }

//     google.maps.event.addDomListener(window, 'load', init_map);/*creates a listener to where it loads the maps when the page finishes loading*/
//>>>>>>> mikebranch
