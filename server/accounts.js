// Accounts config
Accounts.loginServiceConfiguration.remove({
  service: "github"
});

Accounts.loginServiceConfiguration.insert({
  service: "github",
  clientId: "83f1c796a14e1f6ea61a",
  secret: "1c59890a41679554964713050e237ee89332731b"
});

Accounts.onCreateUser(function(options, user){
  var accessToken = user.services.github.accessToken,
    result,
    profile;
  
	console.log(accessToken);
	
	result = Meteor.http.get("https://api.github.com/user", {
    headers: {"User-Agent": "Meteor/1.0"},
    params: {
      access_token: accessToken
    }
  });
	
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
