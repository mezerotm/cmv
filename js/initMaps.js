function init_map() {
      var var_location = new google.maps.LatLng(45.430817,12.331516);

      var var_mapoptions = {
        center:var_location,
        zoom: 14
      }

      var map1 = new google.maps.Map(document.getElementById("map1"), var_mapoptions);
      var map2 = new google.maps.Map(document.getElementById("map2"), var_mapoptions);
      var map3 = new google.maps.Map(document.getElementById("map3"), var_mapoptions);
      var map4 = new google.maps.Map(document.getElementById("map4"), var_mapoptions);
    }

    google.maps.event.addDomListener(window, 'load', init_map);/*creates a listener to where it loads the maps when the page finishes loading*/
