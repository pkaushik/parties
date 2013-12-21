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



var partyMarker = L.Marker.extend({
   options: { 
      public: true,
      attending: 1
   }
});

Template.map.rendered = function () { 
  
  // basic housekeeping
  $(window).resize(function () {
    var h = $(window).height(), offsetTop = 90; // Calculate the top offset
    $('#map_canvas').css('height', (h - offsetTop));
  }).resize();
  
  // initialize map events
  if (!LeafletLib.map) {
    LeafletLib.initialize($("#map_canvas")[0], [ 41.8781136, -87.66677956445312 ], 13);
    
    LeafletLib.map.on("dblclick", function(e) {
      if (! Meteor.userId()) // must be logged in to create parties
        return;
        
      openCreateDialog(e.latlng);
    });
  }
   
  // now observe the collection 
  Parties.find({}).observe({
    added: function(party) {
      var icon = L.AwesomeMarkers.icon({
        icon: 'text',
        text: '1',
        markerColor: party.public ? 'darkred' : 'darkblue'
      });
      
      var marker = new partyMarker(party.latlng, {
        id: party._id,
        title: party.title,
        icon: icon,
        public: party.public,
        attending: party.attending
      });
      
      marker.on('click', function(e) {
        Session.set("selected", e.target.options.id);
      });
      
      // update default image path
      L.Icon.Default.imagePath = 'packages/leaflet/images';
      LeafletLib.addMarker(marker);
    },
    removed: function(party) {
      
    }
  })  
     

  
  //var self = this;

  
  // if (! self.handle) {
  //   self.handle = Meteor.autorun(function () {
  //     var selected = Session.get('selected');
  //     var selectedParty = selected && Parties.findOne(selected);
  //     var radius = function (party) {
  //       return 10 + Math.sqrt(attending(party)) * 10;
  //     };
  // 
  //     // Draw a circle for each party
  //     var updateCircles = function (group) {
  //       group.attr("id", function (party) { return party._id; })
  //       .attr("cx", function (party) { return party.x * 500; })
  //       .attr("cy", function (party) { return party.y * 500; })
  //       .attr("r", radius)
  //       .attr("class", function (party) {
  //         return party.public ? "public" : "private";
  //       })
  //       .style('opacity', function (party) {
  //         return selected === party._id ? 1 : 0.6;
  //       });
  //     };
  // 
  //     var circles = d3.select(self.node).select(".circles").selectAll("circle")
  //       .data(Parties.find().fetch(), function (party) { return party._id; });
  // 
  //     updateCircles(circles.enter().append("circle"));
  //     updateCircles(circles.transition().duration(250).ease("cubic-out"));
  //     circles.exit().transition().duration(250).attr("r", 0).remove();
  // 
  //     // Label each with the current attendance count
  //     var updateLabels = function (group) {
  //       group.attr("id", function (party) { return party._id; })
  //       .text(function (party) {return attending(party) || '';})
  //       .attr("x", function (party) { return party.x * 500; })
  //       .attr("y", function (party) { return party.y * 500 + radius(party)/2 })
  //       .style('font-size', function (party) {
  //         return radius(party) * 1.25 + "px";
  //       });
  //     };
  // 
  //     var labels = d3.select(self.node).select(".labels").selectAll("text")
  //       .data(Parties.find().fetch(), function (party) { return party._id; });
  // 
  //     updateLabels(labels.enter().append("text"));
  //     updateLabels(labels.transition().duration(250).ease("cubic-out"));
  //     labels.exit().remove();
  // 
  //     // Draw a dashed circle around the currently selected party, if any
  //     var callout = d3.select(self.node).select("circle.callout")
  //       .transition().duration(250).ease("cubic-out");
  //     if (selectedParty)
  //       callout.attr("cx", selectedParty.x * 500)
  //       .attr("cy", selectedParty.y * 500)
  //       .attr("r", radius(selectedParty) + 10)
  //       .attr("class", "callout")
  //       .attr("display", '');
  //     else
  //       callout.attr("display", 'none');
  //   });
  // }
};

Template.map.destroyed = function () {
  this.handle && this.handle.stop();
};