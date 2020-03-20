var db = require("../models");

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

    // TODO: call APIs

    res.render("result", req.body);
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
