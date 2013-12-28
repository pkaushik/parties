// All Tomorrow's Parties -- client

Meteor.subscribe("directory");
Meteor.subscribe("parties");

Meteor.startup(function () {
  Meteor.autorun(function () {
    if (! Session.get("selected")) {
      var party = Parties.findOne();
      if (party) {
        Session.set("selected", party._id);
      }
    }
  });
});


