Template.loggedin.events({
  'click #logout': function(e, tmpl) {
    Meteor.logout(function(err){
      if (err) {
        // handle error
      } else {
        // nothing
      }
    });
  }
}); 

Template.loggedout.events({
  'click #login': function(e, tmpl) {
    Meteor.loginWithGithub({
      
    }, function(err){
      if (err) {
        console.log(err)
      } else {
        // show an alert
      }
    })
  }
});