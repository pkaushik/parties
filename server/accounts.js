// Accounts config
Accounts.loginServiceConfiguration.remove({
  service: "github"
});

Accounts.loginServiceConfiguration.insert({
  service: "github",
  clientId: "insert your clientId",
  secret: "insert your secret"
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
