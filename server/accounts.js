// Accounts config
ServiceConfiguration.configurations.remove({
  service: "github"
});

// chicago-parties.meteor.com
ServiceConfiguration.configurations.insert({
  service: "github",
  clientId: "5c9b7e93a5830dd3634a",
  secret: "1fd43cfe0e0311e726e239a7a1bec03f8c3c2c89"
});

// localhost:3000
// ServiceConfiguration.configurations.insert({
//   service: "github",
//   clientId: "83f1c796a14e1f6ea61a",
//   secret: "1c59890a41679554964713050e237ee89332731b"
// });

Accounts.onCreateUser(function(options, user){
  var accessToken = user.services.github.accessToken,
    result,
    profile;
  	
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
    "html_url");
  
  user.profile = profile;
  
  return user;
});
