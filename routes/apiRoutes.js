var db = require("../models");
 
module.exports = function (app) {
    // Get all packing list results
  app.get("/api/packinglists", function(req, res) {
    db.Packinglist.findAll({}).then(function(dbPackinglist) {
      res.json(dbPackinglist);
    });
  });

  // Get route for returning posts of a specific season
  app.get("/api/packinglists/:season", function(req, res) {
    db.Packinglist.findAll({
      where: {
        season: req.params.season
      }
    })
      .then(function(dbPackinglist) {
        res.json(dbPackinglist);
      });
  });

  // POST route for saving a new todo
  app.post("/api/packinglists", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text

    // and complete property
    
    db.Packinglist.create({
      text: req.body.text,
      quantity: req.body.quantity,
      season: req.body.season,
      complete: req.body.complete
    }).then(function(dbPackinglist) {
      // We have access to the new todo as an argument inside of the callback function
      console.log('this is working here apiRoutes');
      res.json(dbPackinglist);
    });
    
  });

  // DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // req.params.id
  app.delete("/api/packinglists/:id", function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.Packinglist.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPackinglist) {
      res.json(dbPackinglist);
    });

  });

  // DELETE all from db
  app.delete("/api/packinglists/", function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.Packinglist.destroy({
      where: {},
      truncate: true
    }).then(function(dbPackinglist) {
      res.json(dbPackinglist);
    });
  });

  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/api/packinglists", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Packinglist.update({
      text: req.body.text,
      complete: req.body.complete
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbTodo) {
      res.json(dbTodo);
    });
  });
  
  
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