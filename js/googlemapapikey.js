/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

GOOGLE_MAP_KEY = "AIzaSyC_y5IRdURJMxS06jTtKecEq47r9VFcLTg";
 function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3' +
      '&key=' + GOOGLE_MAP_KEY +'&callback=initialize'; //& needed
    document.body.appendChild(script);
    alert(script);
    }
