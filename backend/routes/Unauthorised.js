const express = require('express')

const route = express.Router()

route.route('/unauthorised').get((req,res) => {
    res.status(401).send('You are not authorised!')
})

module.exports = route