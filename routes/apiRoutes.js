var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Create a new trip
  app.post("/api/saveTrip", authCheck, function (req, res) {
    // server side validation
    if (req.body.name == null || req.body.name.trim() == "") {
      res.send(false);
    } else {
      console.log("get post request");
      req.body.UserId = req.user.id;
      db.Trips.findOne({ where: { name: req.body.name, UserId: req.user.id } }).then(function (searchResult) {
        // console.log(result);
        if (searchResult == null) {
          // new
          db.Trips.create(req.body).then(function (newData) {
            res.send({ isNewTrip: true, data: newData });
          });
        } else {
          // existing trip
          res.send({ isNewTrip: false, data: {} });
        }
      });
    }
  });

  // update a trip
  app.put("/api/updateTrip", authCheck, function (req, res) {
    db.Trips.update(req.body, { where: { name: req.body.name, UserId: req.user.id } }).then(function (result) {
      res.send(result);
    });
  });

  // get a trip info
  app.get("/api/getTrip/:name", authCheck, function (req, res) {
    db.Trips.findOne({ where: { name: req.params.name, UserId: req.user.id } }).then(function (result) {
      res.send(result);
    });
  });


  // delete a trip
  app.delete("/api/deleteTrip/:name", authCheck, function (req, res) {
    console.log("delete called!");
    db.Trips.destroy({ where: { name: req.params.name, UserId: req.user.id } }).then(function (result) {
      res.status(200).json(result);
    });
  });
};


function authCheck(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}