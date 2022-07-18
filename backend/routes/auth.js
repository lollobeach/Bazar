/**
 * File per gli endPoint relativi alla gestione del profilo utente  
 * url da aggiornare in fase di testing per controllare il db
 */

 const { response } = require("express");
 const express = require("express");
 
 //usati per definire le route dell'applicazione
 const authRoutes = express.Router();
 
 //richiamo connessione db
 const dbo = require("../db/conn");
 
 //utile per convertire gli id da String to ObjectId per _id
 const ObjectId = require("mongodb").ObjectId;

 authRoutes.post("/register", async function(req, res){
     try {
            let db_connect = dbo.getDb("services");
            let newUser = {
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                number: req.body.number,
            };
            await db_connect
            .collection("user")
            .insertOne(newUser, function (err, result){
                if (err) throw err;
                res.json(result);
            })
     } catch (error) {
        res.status(500).send(error)
        console.log(error)         
     }
})

module.exports = authRoutes;