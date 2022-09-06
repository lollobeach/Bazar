const { query } = require("express");
const { authJwt } = require("../middlewares/middleware_auth/modules")
const OfferedService = require('../models/offered.service')
const User = require('../models/user.model')
const express = require("express");
const offeredService = require("../models/offered.service");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutesforOfferedServices = express.Router();

//utile per convertire gli id da String to ObjectId per _id
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the documents.
recordRoutesforOfferedServices.route("/listings-offered-services").get(async (req, res) => {
  OfferedService
      .getOfferedServices()
      .find()
      .toArray((err, result) => {
        if (err) {
          res.status(400).send("Error fetching listings!");
        } else {
          res.json(result);
        }
      });
    })

  // This section will help you create a new document.
recordRoutesforOfferedServices.route("/:user/add-offered-service").post(authJwt.verifyToken, async (req, res) => {
  await User.getUser().findOne({ username: req.params.user }, async (err,user) => {
    if (err) throw err
    if (!user) {
      res.status(404).send('User not found!')
      return
    }
    if (user.plan === 'free' && user.posts.length === 0 || user.plan === 'cheap' && user.posts.length < 3 || user.plan === 'premium') {
      console.log(1)
      const matchDocument = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        place: req.body.place,
        dataCreation: new Date(),
        lastUpdate: new Date(),
        user: req.params.user
      };
    
      OfferedService
      .getOfferedServices()
      .insertOne(matchDocument, async (err, result) => {
        if (err) throw err
        else {
          console.log(`Added a new match with id ${result.insertedId}`);
        }
      })

      
      res.status(200).send('Post correctly inserted')
      return
    } else {
      res.status(401).send('You do not have the right plan. Remember:\n-free plan => one post\n-cheap plan => three posts\npremium plan => unlimited posts')
      return
    }
  })
})

recordRoutesforOfferedServices.param('service_id', (req, res, next) => {
  req.queryid = { _id: ObjectId(req.params.service_id)};
    next()
  })

recordRoutesforOfferedServices.route("/listings-offered-services/:service_id")
    .get(async (req, res) => {
        try{
            let query = req.queryid;
            await OfferedService
            .getOfferedServices()
            .findOne(query, (err, result) => {
                if(err) throw err;
                if (!result) return res.status(404).send('Post not found')
                res.json(result);
            }); 
        } catch(error) {
            console.log(error)
            return res.status(500).send(error)
        }
    })
    
    .patch(async (req, res) => {
        try{
            let query = req.queryid;
            console.log(query);
            let newService = {
                $set: {
                    name: req.body.name,
                    type: req.body.type,
                    description: req.body.description,
                    price: req.body.price,
                },
                $currentDate: { lastModified: true } 
            }
            await offeredService
            .getOfferedServices()
            .updateOne(query, newService, function (err, result){
                if (err) throw err;
                console.log("1 document patched");
                return res.json(result);
            });
        }catch(error){
            console.log(error)
            return res.status(500).send(error)
        }    
    })

    .delete(async function(req, res) {
      try{
        let query = req.queryid;
        await OfferedService
        .getOfferedServices()
        .deleteOne(query, async (err, _result) => {
          if (err) return res.status(400).send(`Error deleting listing with id ${query._id}!`);
          const result = await _result
          if (result.acknowledged && result.deletedCount == 1) {
            return res.status(200).send("Deleted Successfully")
          }
          if (result.deletedCount !== 1) return res.status(404).send("Post not found")
        });
      }
      catch(error){
        res.status(500).send(error)
    }
  });

  module.exports = recordRoutesforOfferedServices; 
  