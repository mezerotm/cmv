 function init_map() {
        var var_location = new google.maps.LatLng(33.957,-84.282);

        var var_mapoptions = {
          center:var_location,
          zoom: 11
        }

        var map1 = new google.maps.Map(document.getElementById("map1"), var_mapoptions);
         //The below maps, html code, has been pulled for the time being.
      var map2 = new google.maps.Map(document.getElementById("map2"), var_mapoptions);
      var map3 = new google.maps.Map(document.getElementById("map3"), var_mapoptions);
      var map4 = new google.maps.Map(document.getElementById("map4"), var_mapoptions);

        map1.data.setStyle({
            fillColor: 'blue'
          });

        //make sure maps dynamically resize to fit windows
        google.maps.event.addDomListener(map1, 'idle', function() {
          google.maps.event.trigger(map1, 'resize');
        });
        google.maps.event.addDomListener(map2, 'idle', function() {
          google.maps.event.trigger(map2, 'resize');
        });
        google.maps.event.addDomListener(map3, 'idle', function() {
          google.maps.event.trigger(map3, 'resize');
        });
        google.maps.event.addDomListener(map4, 'idle', function() {
          google.maps.event.trigger(map4, 'resize');
        });
      }

      google.maps.event.addDomListener(window, 'load', init_map);/*creates a listener to where it loads the maps when the page finishes loading*/
