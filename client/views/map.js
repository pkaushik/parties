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
    iconSize: null,
    html: '<b>' + attending(party) + '</b>',
    className: className  
  });
}

Template.map.created = function() {
  var self = this;
  if (!self.handle) {
    self.handle = Parties.find({}).observe({
      added: function(party) {
        console.log('added: ' + party._id)
        var marker = new L.Marker(party.latlng, {
          id: party._id,
          icon: createIcon(party)
        }).on('click', function(e) {
          Session.set("selected", e.target.options.id);
        });
      
        // update default image path
        LeafletLib.addMarker(marker);
        return marker;
      },
      changed: function(party, _party) {
        _.each(LeafletLib.markers, function(m) {
          if (m.options.id === party._id) {
            m.setIcon(createIcon(party));
          }
        })
      },
      removed: function(party) {
        // todo
      }
    }) 
  }
}

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