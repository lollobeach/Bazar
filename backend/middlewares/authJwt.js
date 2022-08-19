const jwt = require('jsonwebtoken')
const config = require('../db/auth.config')
const User = require('../models/user.model')
const Plans = require('../models/plan.model')

verifyToken = (req,res,next) => {
    let token = req.session.token
    if(!token) return res.status(403).send('No token provided!')
    jwt.verify(token,config.secret, (err,decoded) => {
        if (err) return res.status(401).send('Unathorized!')
        req.userId = decoded.id
        next()
    })
}

isFreePlan = (req,res,next) => {
    User.getUser().findOne({ username: req.params.username }, (err,user) => {
        if (err) {
            throw err
        }
        if (!user) return res.status(404).send('User not found!')
        Plans.getPlans().findOne({ type: user.plan }, (err, plan) => {
            if (err) res.status(500).send(err)
            if (plan.type === 'free') {
                next()
                return
            }
            res.status(403).send('Require Free Plan')
        })
    })
}

isCheapPlan = (req,res,next) => {
    User.getUser().findOne({ username: req.params.username }, (err,user) => {
        if (err) {
            res.status(500).send(err)
            return
        }
        if (!user) return res.status(404).send('User not found!')
        Plans.getPlans().findOne({
            type: user.plan
        }, (err, plan) => {
            if (err) res.status(500).send(err)
            if (plan.type === 'cheap') {
                next()
                return
            }
            res.status(403).send('Require Cheap Plan')
        })
    })
}

isPremiumPlan = (req,res,next) => {
    User.getUser().findOne({ username: req.params.username }, (err,user) => {
        if (err) {
            res.status(500).send(err)
            return
        }
        if (!user) return res.status(404).send('User not found!')
        Plans.getPlans().findOne({
            type: user.plan
        }, (err, plan) => {
            if (err) res.status(500).send(err)
            if (plan.type === 'premium') {
                next()
                return
            }
            res.status(403).send('Require Premium Plan')
        })
    })
}

const authJwt = {
    verifyToken,
    isFreePlan,
    isCheapPlan,
    isPremiumPlan
}

module.exports = authJwt