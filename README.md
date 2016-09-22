parties
=======

Meteor Parties example upgraded
- uses github login
- uses Leaflet map


Configuration Notes:
=======

In the [\server\accounts.js] file, you'll find the following code sections:

// chicago-parties.meteor.com
// ServiceConfiguration.configurations.insert({
  // service: "github",
  // clientId: "5c9b7e93a5830dd3634a",
  // secret: "1fd43cfe0e0311e726e239a7a1bec03f8c3c2c89"
// });

// localhost:3000
ServiceConfiguration.configurations.insert({
  service: "github",
  clientId: "83f1c796a14e1f6ea61a",
  secret: "1c59890a41679554964713050e237ee89332731b"
});
As you'll be able to see, when you compare it to the current [42755c9 on Oct 31, 2015] GitHub version; I've uncommented the [localhost] version & commented the [chicago-parties.meteor.com] version.

In addition, for the provided GitHub keys above for OAuth to work, you must actually use [http://localhost:3000/] for your Meteor Test app & not a local IP [10.10.10.13].
