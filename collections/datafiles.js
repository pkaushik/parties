Datafiles = new Meteor.Collection("datafiles");

Meteor.startup(function () {// code to run on server at startup 

        if (Datafiles.find().count()===0) {
            var files = [ // ...just to get something in the db to start...
 "http://ec2-54-235-86-144.compute-1.amazonaws.com/chart1data.tsv",
 "http://ec2-54-235-86-144.compute-1.amazonaws.com/chart2data.tsv" ];
            for (var i=0; i<files.length; i++)
                Datafiles.insert({name: "chart"+(i+1), file: files[i]});
        }
    });
