const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutesForRequiredServices = express.Router();

const dbo = require("../config/conn")

//utile per convertire gli id da String to ObjectId per _id
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the documents.
recordRoutesForRequiredServices.route("/listingsRequiredServices").get(async function (req, res) {
    const dbConnect = dbo.getDb("services");
  
    dbConnect
      .collection("Required Services")
      .find({}).limit(50)
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching listings!");
        } else {
          res.json(result);
        }
      });
  })


  // This section will help you create a new document.
    .post(function (req, res) {
    const dbConnect = dbo.getDb("services");
    const matchDocument = {
      /*listing_id: req.body.id,
      last_modified: new Date(),
      session_id: req.body.session_id,
      direction: req.body.direction
      */
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      price: req.body.price,
      creation: new Date()
    };
  
    dbConnect
      .collection("Required Services")
      .insertOne(matchDocument, function (err, result) {
        if (err) {
          res.status(400).send("Error inserting matches!");
        } else {
          console.log(`Added a new match with id ${result.insertedId}`);
          res.status(204).send();
        }
      });
  });

  recordRoutesForRequiredServices.param('service_id', function (req, res, next) {
    req.queryId = { _id: ObjectId(req.params.service_id)};
    next()
})




  recordRoutesForRequiredServices.route("/listingsRequiredServices/:service_id")
    .get(async function(req, res, next) {
        try{
            let db_connect = dbo.getDb("services");
            let query = req.queryId;
            await db_connect
            .collection("Required Services")
            .findOne(query, function(err, result){
                if(err) throw err;
                res.json(result);
            }); 
        }catch(error){
            res.status(500).send(error)
            console.log(error)
        }
    })
    .patch(async function(req, res) {
        try{
            let db_connect = dbo.getDb("services");
            let query = req.queryId;
            let newService = {
                $set: {
                    name: req.body.name,
                    type: req.body.type,
                    description: req.body.description,
                    price: req.body.price,
                },
                $currentDate: { lastModified: true } //meh
            }
            await db_connect
            .collection("Required Services")
            .updateOne(query, newService, function (err, result){
                if (err) throw err;
                console.log("1 document patched");
                res.json(result);
            });
        }catch(error){
            res.status(500).send(error)
            console.log(error)
        }    
    })
    .delete(async function(req, res) {
      try{
      let dbConnect = dbo.getDb("services");
    
      let query = req.queryId;
     
      console.log(req.queryId);
    
       
      await dbConnect
        .collection("Required Services")
        .deleteOne(query, function (err, _result) {
          if (err) {
            res.status(400).send(`Error deleting listing with id ${query._id}!`);
          } 
          else {
            res.json(_result);
            if(_result.acknowledged && _result.deletedCount == 1){
              console.log("Deleted Successfully")
            }
            else{
              console.log("Error in deleting record")
            }
          }
        });
      }
      catch(error){
        res.status(500).send(error)
        console.log(error)
    }
    });
 

  module.exports=recordRoutesForRequiredServices; 