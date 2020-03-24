var db = require("../models");
module.exports = function (app) {
  // Load index page
  app.get("/", (req, res) => {
    if(req.user == undefined){
      // no log in
      res.render("index");
    }else{
      // log in user
      // get user saved trips
      db.Trips.findAll({where:{UserId:req.user.dataValues.id}}).then(function(result){
        res.render("index", { user: req.user.dataValues, trips:result });
      })
    }
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
