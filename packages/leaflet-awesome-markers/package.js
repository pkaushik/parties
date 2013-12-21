Package.describe({
  summary: "Colorful iconic & retina-proof markers for Leaflet, based on the Font Awesome/Twitter Bootstrap icons"
});

Package.on_use(function (api, where) {
  api.add_files('leaflet.awesome-markers.js', 'client');
  api.add_files('leaflet.awesome-markers.css', 'client');
  api.add_files('images/markers-matte.png', 'client');
  api.add_files('images/markers-matte@2x.png', 'client');
  api.add_files('images/markers-plain.png', 'client');
  api.add_files('images/markers-shadow.png', 'client');
  api.add_files('images/markers-shadow@2x.png', 'client');
  api.add_files('images/markers-soft.png', 'client');
  api.add_files('images/markers-soft@2x.png', 'client');
})