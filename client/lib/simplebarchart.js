d3.custom = {};

d3.custom.barChart = function module() {
    var width = 420,
    barHeight = 20,
    chartID = "chart",
    numberFmtStr = "03d";
  
    function exports(_selection) {
	var numberFmt = d3.format(numberFmtStr);
	_selection.each( function(_data) {
		_data.forEach( function(d) { d.value = +d.value; } );
      
		var x = d3.scale.linear()
		    .domain([0, d3.max(_data, function(d) { return d.value; })])
		    .range([0, width]);

		var svg = d3.select(this)
		    .selectAll("svg")
		    .data([_data]);
      
		svg.enter().append("svg")
		    .classed("barchart", 1);
      
		svg.transition().attr({width: width, height: barHeight*_data.length});
      
		var bars = svg.append("g")
		    .selectAll(".bar")
		    .data(_data)
		    .enter()
		    .append("g")
		    .classed("bar", 1)
		    .attr({transform: function(d, i) { return "translate(0," + i * barHeight + ")"; }});
 
		bars.append("rect")
		    .attr({width: function(d) { return x(d.value); }, height: barHeight-1});

		bars.append("text")
		    .attr({x: function(d) {return x(d.value) - 3; }, y: barHeight/2, dy: ".35em"})
		    .text(function(d) { return numberFmt(d.value); });
	    });
    }
  
    exports.width = function(_w) {
	if (!arguments.length) return width;
	width = _w;
	return this;
    };
  
    exports.barHeight = function(_bh) {
	if (!arguments.length) return barHeight;
	barHeight = _bh;
	return this;
    };
  
    exports.chartID = function(_id) {
	if (!arguments.length) return chartID;
	chartID = _id;
	return this;
    };
  
    exports.numberFormat = function(_fmt) {
	if (!arguments.length) return numberFmtStr;
	numberFmtStr = _fmt;
	return this;
    };
  
    return exports;
};
