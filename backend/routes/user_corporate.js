const User = require('../models/user.model');
const Corporate = require('../models/corporate.model');
const express = require('express');

const router = express.Router();

function handelError(err,res) {
    console.log(err);
    return res.status(500).send('Error');
}

router.route('/list-users').get(async (req,res) => {
    await User.getUser().find().toArray(
        async (err,result) => {
            if (err) handelError(err,res);
            const _result = await result;
            res.status(200).json(_result);
        }
    )
})

router.route('/list-corporates').get(async (req,res) => {
    await Corporate.getCorporates().find().toArray(
        async (err,result) => {
            if (err) handelError(err,res);
            const _result = await result;
            res.status(200).json(_result);
        }
    )
})

module.exports = router;