/**
 * File per gli endPoint relativi ai servizi 
 * url da aggiornare in fase di testing per controllare il db
 */

const { response } = require("express");
const express = require("express");

//usati per definire le route dell'applicazione
const serviceRoutes = express.Router();

//richiamo connessione db
const dbo = require("../db/conn");

//utile per convertire gli id da String to ObjectId per _id
const ObjectId = require("mongodb").ObjectId;

/*serviceRoutes.route("/service").get(function (req, res){
    let db_connect = dbo.getDb("services");
    db_connect
    .collection("service")
    .find({})
    .toArray(function (err, result){
        if (err) throw err;
        res.json(result);
    });
});*/
//fix post request
serviceRoutes.route("/service")
    .get(async (req, res) => {
        try{
            let db_connect = dbo.getDb("services");
            await db_connect
            .collection("service")
            .find({})
            .toArray(function (err, result){
                if (err) throw err;
                res.json(result);
            });
        }catch(error){
            res.status(500).send(error)
            console.log(error)
        }
    })
    .post(async (req, res) => {
        try{
            let db_connect = dbo.getDb("services");
            let myService = {
                name: req.body.name,
                type: req.body.type,
                description: req.body.description,
                price: req.body.price,
            };
            await db_connect
            .collection("service")
            .insertOne(myService, function (err, res){
                if(err) throw err;
                response.json(res);
            });
        }catch(error){
            res.status(500).send(error)
            console.log(error)
        }
    })
/*
serviceRoutes.route("/service/:id").get(function (req, res){
    let db_connect = dbo.getDb("services");
    let query = { _id: ObjectId(req.params.id)};
    db_connect
    .collection("service")
    .findOne(query, function(err, result){
        if(err) throw err;
        res.json(result);
    });
});*/

/*serviceRoutes.route("/service/").post(function (req, response){
    let db_connect = dbo.getDb("services");
    let myService = {
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        price: req.body.price,
    };
    db_connect.collection("service").insertOne(myService, function (err, res){
        if(err) throw err;
        response.json(res);
    });
});*/

/*serviceRoutes.route("/service/up/:id").put(async function (req, response){
    let db_connect = dbo.getDb("services");
    let query = { _id: ObjectId(req.params.id)}
    let newService = {
        $set: {
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
            price: req.body.price,
        },
    }
    //db_connect.collection("services").updateOne(query, newService, function(err, res){
    await db_connect.collection("services").updateOne(
        { _id: ObjectId(req.params.id)   },
        {
            $set: {
                name: req.body.name,
                type: req.body.type,
                description: req.body.description,
                price: req.body.price,
            },
            $currentDate: { lastModified: true }
        }
    );
      /*  if(err) throw err;
        response.json(res);
    })
});*/

/*serviceRoutes.patch("/service/:id", async (request, response) => {
    try {
      await foodModel.findByIdAndUpdate(request.params.id, request.body);
      await foodModel.save();
      response.send(food);
    } catch (error) {
      response.status(500).send(error);
    }
  });*/
/*
serviceRoutes.route("/service/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    let newvalues = {
        $set: {
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
            price: req.body.price,
        },
    };
    db_connect
       .collection("service")
       .updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        response.json(res);
      });
  });


serviceRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect.collection("records").deleteOne(myquery, function (err, obj) {
       if (err) throw err;
       console.log("1 document deleted");
       response.json(obj);
    });
  });*/

module.exports = serviceRoutes;