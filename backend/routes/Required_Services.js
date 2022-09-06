const express = require("express");
const RequiredServices = require("../models/required.service");
const User = require("../models/user.model");
const authJwt = require("../middlewares/middleware_auth/authJwt");
const getId = require("../config/getId");

const recordRoutesForRequiredServices = express.Router();

const ObjectId = require("mongodb").ObjectId;

function handleErr(err,res) {
  console.log(err);
  return res.status(500).send('Error');
}

recordRoutesForRequiredServices.route("/Bazar/listings-required-services").get(async (req, res) => {
    await RequiredServices
    .getRequiredServices()
    .find()
    .toArray(async (err, result) => {
      if (err) handleErr(err,res);
      const _result = await result;
      res.status(200).send(_result);
    });
})

recordRoutesForRequiredServices.route("/Bazar/listings-required-services/:id").get(async (req,res) => {
  const user = req.params.id;
  await User.getUser().findOne({ _id: ObjectId(user) }, async (err,user) => {
    if (err) handleErr(err,res);
    const _user = await user;
    if (!_user) return res.status(404).send('User not found');
    const idServices = await _user.requiredServices;
    await RequiredServices.getRequiredServices().find({ _id: { $in: idServices } }).toArray(async (err,result) => {
      if (err) handleErr(err,res);
      const _result = await result;
      res.status(200).send(_result);
    })
  })
})

recordRoutesForRequiredServices.route("/Bazar/add-required-service").post(authJwt.verifyToken, async (req, res) => {
  const id = await getId.getId(req);
  await User.getUser().findOne({ _id: ObjectId(id)}, async (err,user) => {
    if (err) handleErr(err,res);
    const _user = await user;
    if (!_user) return res.status(404).send('User not found');
    const creationDate = new Date();
    const _creationDate = creationDate.getTime();
    const requiredDate = new Date(req.body.dataRequired);
    const _requiredDate = requiredDate.getTime();
    if (_requiredDate < _creationDate) return res.status(400).send('Data required not valid!');
    const matchDocument = {
      title: req.body.title,
      description: req.body.description,
      place: req.body.place,
      dataRequired: requiredDate,
      dataCreation: creationDate,
      lastUpdate: new Date(),
      user: id
    };
    await RequiredServices.getRequiredServices().insertOne(matchDocument, async (err,result) => {
      if (err) handleErr(err,res);
      const _result = await result;
      await User.getUser().updateOne({ _id: _user._id}, { $push: { requiredServices: _result.insertedId }})
    })
    return res.status(201).send('Post correctly inserted');
  })
});

recordRoutesForRequiredServices.route("/Bazar/service-required/:service_id").get(async (req, res) => {
  let query = req.params.service_id;
  await RequiredServices
  .getRequiredServices()
  .findOne({ _id: ObjectId(query) }, async (err, result) => {
      if(err) handleErr(err,res);
      const _result = await result;
      res.status(200).send(_result);
  });
})


recordRoutesForRequiredServices.route("/Bazar/update-required-service/:id").patch(authJwt.verifyToken, async function(req, res) {
  const id = await getId.getId(req);
  let query = req.params.id;
  await User.getUser().findOne({ _id: ObjectId(id) }, async (err,user) => {
    if (err) handleErr(err,res);
    const _user = await user;
    if (!_user) return res.status(404).send('User not found');
    const services = await _user.requiredServices.map(x => x.toString());
    if (!services.includes(query)) return res.status(404).send('Post not found')
    await RequiredServices.getRequiredServices().findOne({ _id: ObjectId(query) }, async (err,post) => {
      if (err) handleErr(err,res);
      const _post = await post;
      if (!_post) return res.status(404).send('Post not found');
      let newService = null;
      if (req.body.dataRequired) {
        const requiredData = new Date(req.body.dataRequired).getTime();
        const creationDate = _post.dataCreation.getTime();
        if (requiredData < creationDate) return res.status(400).send('Required data is not valid');
        newService = {
          $set: req.body,
          $set: {
            dataRequired: new Date(req.body.dataRequired)
          },
          $currentDate: { lastUpdate: true }
        }
        await RequiredServices.getRequiredServices().updateOne({ _id: _post._id }, newService, async(err) => {
          if (err) handleErr(err,res);
          return res.status(200).send('Post correctly updated');
        })
      } else {
        newService = {
          $set: req.body,
          $currentDate: { lastUpdate: true }
        }
        await RequiredServices.getRequiredServices().updateOne({ _id: _post._id }, newService, async (err) => {
          if (err) handleErr(err,res);
          return res.status(200).send('Post correctly updated');
        })
      }
    })
  })
});   



recordRoutesForRequiredServices.route("/Bazar/delete-required-service/:id").delete(authJwt.verifyToken, async (req, res) => {
  const id = await getId.getId(req);
  let query = req.params.id;
  await User.getUser().findOne({ _id: ObjectId(id) }, async (err,user) => {
    if (err) handleErr(err);
    const _user = await user;
    if (!_user) return res.status(404).send('User not found');
    const services = await _user.requiredServices.map(x => x.toString());
    if (!services.includes(query)) return res.status(404).send('-->Post not found');
    await RequiredServices.getRequiredServices().deleteOne({ _id: ObjectId(query) }, async (err,result) => {
      if (err) handleErr(err,res);
      const _result = await result;
      if (_result.deletedCount !== 1) return res.status(404).send('<--Post not found');
      await User.getUser().updateOne({ _id: _user._id }, { $pull: { requiredServices: ObjectId(query)  } }, async (err) => {
        if (err) handleErr(err,res);
      })
      return res.status(200).send('Post correctly deleted');
    })
  })
})

  module.exports=recordRoutesForRequiredServices; 