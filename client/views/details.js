///////////////////////////////////////////////////////////////////////////////
// Party details sidebar

Template.details.helpers({
  party: function () {
    return Parties.findOne(Session.get("selected"));
  },
  anyParties: function () {
    return Parties.find().count() > 0;
  },
  creatorName: function () {
    var owner = Meteor.users.findOne(this.owner);
    if (owner._id === Meteor.userId())
      return "me";
    return displayName(owner);
  },
  canRemove: function () {
    return this.owner === Meteor.userId() && attending(this) === 0;
  },
  maybeChosen: function (what) {
    var myRsvp = _.find(this.rsvps, function (r) {
      return r.user === Meteor.userId();
    }) || {};

    return what == myRsvp.rsvp ? "chosen btn-inverse" : "";
  }
});

Template.details.events({
  'click .rsvp_yes': function () {
    Meteor.call("rsvp", Session.get("selected"), "yes");
    return false;
  },
  'click .rsvp_maybe': function () {
    Meteor.call("rsvp", Session.get("selected"), "maybe");
    return false;
  },
  'click .rsvp_no': function () {
    Meteor.call("rsvp", Session.get("selected"), "no");
    return false;
  },
  'click .invite': function () {
    Session.set("showInviteDialog", true);
    return false;
  },
  'click .remove': function () {
    Parties.remove(this._id);
    return false;
  }
});
