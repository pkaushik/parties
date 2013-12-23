///////////////////////////////////////////////////////////////////////////////
// Map display

$(window).resize(function () {
  var h = $(window).height(), offsetTop = 90; // Calculate the top offset
  $mc = $('#map_canvas');
  $mc.css('height', (h - offsetTop));
}).resize();


var openCreateDialog = function (latlng) {
  Session.set("createCoords", latlng);
  Session.set("createError", null);
  Session.set("showCreateDialog", true);
};


var createIcon = function(party) {
  var className = 'leaflet-div-icon ';
  className += party.public ? 'public' : 'private';
  return L.divIcon({
    iconSize: [30, 30],
    html: '<b>' + attending(party) + '</b>',
    className: className  
  });
}

Template.map.created = function() {
  Parties.find({}).observe({
    added: function(party) {
      var marker = new L.Marker(party.latlng, {
        _id: party._id,
        icon: createIcon(party)
      }).on('click', function(e) {
        Session.set("selected", e.target.options._id);
      });      
      LL.addMarker(marker);
    },
    changed: function(party) {
      var marker = LL.markers[party._id];
      if (marker) marker.setIcon(createIcon(party));
    },
    removed: function(party) {
      LL.removeMarker(party._id);
    }
  });
}


Template.map.rendered = function () { 
  // basic housekeeping
  $(window).resize(function () {
    var h = $(window).height(), offsetTop = 90; // Calculate the top offset
    $('#map_canvas').css('height', (h - offsetTop));
  }).resize();
  
  // initialize map events
  if (!LL.map) {
    LL.initialize($("#map_canvas")[0], [ 41.8781136, -87.66677956445312 ], 13);
    
    LL.map.on("dblclick", function(e) {
      if (! Meteor.userId()) // must be logged in to create parties
        return;
        
      openCreateDialog(e.latlng);
    });
    
    
    var self = this;
    Meteor.autorun(function() {
      var selectedParty = Parties.findOne(Session.get("selected"));
      if (selectedParty) {
        if (!self.animatedMarker) {
          var line = L.polyline([[selectedParty.latlng.lat, selectedParty.latlng.lng]]);
          self.animatedMarker = L.animatedMarker(line.getLatLngs(), {
            autoStart: false,
            distance: 3000,  // meters
            interval: 200, // milliseconds
            icon: L.divIcon({
              iconSize: [50, 50],
              className: 'leaflet-animated-icon'
            })
          });
          LL.map.addLayer(self.animatedMarker);
        } else {
          // animate to here
          var line = L.polyline([[self.animatedMarker.getLatLng().lat, self.animatedMarker.getLatLng().lng],
            [selectedParty.latlng.lat, selectedParty.latlng.lng]]);
          self.animatedMarker.setLine(line.getLatLngs());
          self.animatedMarker.start();
        } 
      }
    })
  }
};

