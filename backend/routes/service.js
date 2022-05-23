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

serviceRoutes.route("/service")
    .get(async function(req, res) {
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
    .post(async function(req, res) {
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
            .insertOne(myService, function (err, result){
                if(err) throw err;
                res.json(result);
            });
        }catch(error){
            res.status(500).send(error)
            console.log(error)
        }
    })

serviceRoutes.param('service_id', function (req, res, next) {
    req.queryId = { _id: ObjectId(req.params.service_id)};
    next()
})

serviceRoutes.route("/service/:service_id")
    .get(async function(req, res, next) {
        try{
            let db_connect = dbo.getDb("services");
            let query = req.queryId;
            await db_connect
            .collection("service")
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
                $currentDate: { lastModified: true }
            }
            await db_connect
            .collection("service")
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
    .delete(async function(req, res){
        try{
            let db_connect = dbo.getDb("services");
            let myquery = req.queryId;
            await db_connect
            .collection("service")
            .deleteOne(myquery, function (err, obj) {
               if (err) throw err;
               console.log("1 document deleted");
               res.json(obj);
               if (obj.acknowledged && obj.deletedCount == 1)
                    console.log("Deleted Successfully")    // Use your response code
                else
                    console.log("Record doesn't exist or already deleted")    // Use your response code
            });
        }catch(error){
            res.status(500).send(error)
            console.log(error)
        }
    })

module.exports = serviceRoutes;