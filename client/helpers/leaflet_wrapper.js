
LL = {

    markers: [ ],

    initialize: function(element, centroid, zoom, features) { 
      LL.map = L.map(element, {
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        touchZoom: false
      }).setView(new L.LatLng( centroid[0], centroid[1] ), zoom);
      
      L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {opacity: .5}).addTo(LL.map);

      LL.map.attributionControl.setPrefix('');
  		var attribution = new L.Control.Attribution();
      attribution.addAttribution("Geocoding data &copy; 2013 <a href='http://open.mapquestapi.com'>MapQuest, Inc.</a>");
      attribution.addAttribution("Map tiles by <a href='http://stamen.com'>Stamen Design</a> under <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a>.");
      attribution.addAttribution("Data by <a href='http://openstreetmap.org'>OpenStreetMap</a> under <a href='http://creativecommons.org/licenses/by-sa/3.0'>CC BY SA</a>.");
      LL.map.addControl(attribution);
    },

    addMarker: function( marker ){
      LL.map.addLayer(marker);
      LL.markers[marker.options._id] = marker;
    },
    
    removeMarker: function( _id ){
      var marker = LL.markers[_id];
      if (LL.map.hasLayer(marker)) LL.map.removeLayer(marker);
    }
}


