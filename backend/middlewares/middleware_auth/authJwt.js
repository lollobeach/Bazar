const jwt = require('jsonwebtoken')
const config = require('../../config/auth.config')
const User = require('../../models/user.model')

verifyToken = (req,res,next) => {
    let token= null
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]
            jwt.verify(token, config.secret)
            next()
        } catch (err) {
            res.status(401).send('Not authorized')
        }
    }
    if (token === null) return res.status(401).send('Token not provided')
}

isFreePlan = (req,res,next) => {
    User.getUser().findOne({ username: req.params.username }, async (err,user) => {
        if (err) {
            throw err
        }
        const _user = await user
        if (!_user) return res.status(404).send('User not found!')
        if (_user.plan !== 'free') return res.status(401).send('Require Free Plan')
    })
}

isCheapPlan = (req,res,next) => {
    User.getUser().findOne({ username: req.params.username }, async (err,user) => {
        if (err) {
            res.status(500).send(err)
            return
        }
        const _user = await user
        if (!_user) return res.status(404).send('User not found!')
        if (_user.plan !== 'free') return res.status(401).send('Require Cheap Plan')
    })
}

isPremiumPlan = (req,res,next) => {
    User.getUser().findOne({ username: req.params.username }, async (err,user) => {
        if (err) {
            res.status(500).send(err)
            return
        }
        const _user = await user
        if (!_user) return res.status(404).send('User not found!')
        if (_user.plan !== 'free') return res.status(401).send('Require Premium Plan')
    })
}

const authJwt = {
    verifyToken,
    isFreePlan,
    isCheapPlan,
    isPremiumPlan
}

module.exports = authJwt