Template.charts.rendered = function () {
    Meteor.subscribe("datafiles", function() {
	    d3.tsv(Datafiles.findOne({name: "chart1"}).file,
		   function(error, data, i) {
		       d3.select("#chart1")
			   .datum(data)
			   .call(d3.custom
				 .barChart().
				 chartID("chart1").
				 numberFormat("04d"));
		   });
	    
	    d3.tsv(Datafiles.findOne({name: "chart2"}).file,
		   function(error, data, i) {
		       d3.select("#chart2")
			   .datum(data)
			   .call(d3.custom
				 .barChart().
				 chartID("chart2")
				 .width(500)
				 .barHeight(10));
		   });
	});
};


