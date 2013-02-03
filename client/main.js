// All Tomorrow's Parties -- client

Meteor.subscribe("directory");
Meteor.subscribe("parties");

// If no party selected, select one.
Meteor.startup(function () {
  Meteor.autorun(function () {
    if (! Session.get("selected")) {
      var party = Parties.findOne();
      if (party)
        Session.set("selected", party._id);
    }
  });
});

var openInviteDialog = function () {
  Session.set("showInviteDialog", true);
};

var openCreateDialog = function (x, y) {
  Session.set("createCoords", {x: x, y: y});
  Session.set("createError", null);
  Session.set("showCreateDialog", true);
};


