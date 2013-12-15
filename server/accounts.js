// Accounts config
Accounts.loginServiceConfiguration.remove({
  service: "github"
});

Accounts.loginServiceConfiguration.insert({
  service: "github",
  clientId: "83f1c796a14e1f6ea61a",
  secret: "4f74f81257aa0a29cf36b4fed737330f4d62e9eb"
});

Accounts.onCreateUser(function(options, user){
  var accessToken = user.services.github.accessToken,
    result,
    profile;
  
	console.log(accessToken);
	  
  result = Meteor.http.get('https://api.github.com/user?access_token=' + accessToken);
  
	console.log('here!!')
	
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
