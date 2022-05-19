const express = require("express");

//usati per definire le route dell'applicazione
const serviceRoutes = express.Router();

//TODO inserire connessione db

//utile per convertire gli id da String to ObjectId per _id
const ObjectId = require("mongodb").ObjectId;

/*serviceRoutes.route("/toservice").get(function (req, res)){

};

serviceRoutes.route("/fromservice").get(function (req, res)){

};*/

module.exports = recordRoutes;