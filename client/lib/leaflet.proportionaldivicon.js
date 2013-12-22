// /*
//  * L.ProportionalDivIcon is a lightweight HTML-based icon class (as opposed to the image-based L.Icon)
//  * to use with L.Marker with additional options {text: string, scale: number}
//  */
// 
// L.ProportionalDivIcon = L.DivIcon.extend({
//   options: {
//     className: 'leaflet-proportional-div-icon'
//   },
//   initialize: function(options) {
//     this.options = _(this.options).extend(options);
//     var point, options = this.options, height = options.size ? 30 + (5*options.size) : 40;
//     point = new L.Point(height, height);
//     options.iconSize = point;
//     
//     var div = this.createIcon();
//   },
//   createShadow: function () {
//     return null;
//   }
// });
// 
// 
// L.proportionalDivIcon = function (options) {
//   console.log(options)
//   return new L.ProportionalDivIcon(options);
// };