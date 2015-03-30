///////////////////////////////////////////////////////////////////////////////
// Party attendance widget

Template.attendance.helpers({
  rsvpName: function () {
    var user = Meteor.users.findOne(this.user);
    return displayName(user);
  },
  outstandingInvitations: function () {
    var party = Parties.findOne(this._id);
    return Meteor.users.find({$and: [
      {_id: {$in: party.invited}}, // they're invited
      {_id: {$nin: _.pluck(party.rsvps, 'user')}} // but haven't RSVP'd
    ]});
  },
  invitationName: function () {
    return displayName(this);
  },
  rsvpIs: function (what) {
    return this.rsvp === what;
  },
  nobody: function () {
    return ! this.public && (this.rsvps.length + this.invited.length === 0);
  },
  canInvite: function () {
    return ! this.public && this.owner === Meteor.userId();
  }
});
