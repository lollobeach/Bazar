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
                password: req.body.password,
                username: req.body.username,
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

authRoutes.post("/login", async function(req, res){
    try {
        let db_connect = dbo.getDb("services");
        await db_connect
        .collection("user")
        .find({})
        .toArray(function (err, result){
            if (err) throw err;
            res.json(result);
            var email = result.filter(result => result.email === req.body.email);
            var username = result.filter(result => result.username === req.body.username);
            var password = result.filter(result => result.password === req.body.password);
            console.log(email + username + password);
        })
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = authRoutes;