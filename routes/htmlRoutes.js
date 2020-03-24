var db = require("../models");

// For weather package
var weather = require("weather-js");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index");
    });
  });

  // Load example page and pass in an example by id
  app.use("/result", function (req, res) {
    // console.log(req.body);

    // Call APIs
    var destination = req.body.destination;

    // NPM weather-js 
    weather.find({search: destination, degreeType: 'F'}, function(err, result) {
      if(err) console.log(err)  
      
      console.log(JSON.stringify(result[0], null, 2));
      console.log(JSON.stringify(result[0].forecast[0].high, null, 2));
      var weatherLocation = result[0].location.name;
      var weatherTemp = result[0].forecast[0].high;
      //res.render("result", {a:"hello from backend",b:"another string from backend!!!!",c:{city:"denver"},d:[1,2,3]});
      res.render("result", {weatherLocation:weatherLocation, weatherTemp:weatherTemp});
    });

  //  res.render("result", req.body);
    
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
