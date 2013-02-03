// Accounts config
Accounts.loginServiceConfiguration.remove({
  service: "github"
});

Accounts.loginServiceConfiguration.insert({
  service: "github",
  clientId: "15a090a0117ac8a9ca64",
  secret: "f6bff9a83200393120536e714badd5cba2853bb8"
});

Accounts.onCreateUser(function(options, user){
  var accessToken = user.services.github.accessToken,
    result,
    profile;
    
  result = Meteor.http.get('https://api.github.com/user?access_token=' + accessToken);
  
  if (result.error) {
    throw error;
  }
  
  profile = _.pick(result.data,
    "login",
    "name",
    "avatar_url",
    "url",
    "company",
    "blog",
    "location",
    "email",
    "bio",
    "html_url");
  
  user.profile = profile;
  
  return user;
});
