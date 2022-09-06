const config = require('../config/auth.config')
const User = require('../models/user.model')
const Plan = require('../models/plan.model')
let jwt = require('jsonwebtoken')
let bcrpyt = require('bcryptjs')

exports.signUp = async (req,res) => {
    let password = req.body.password
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\\[-`{-~]).{6,64}$/)) {
        res.status(406).send('Password not correct')
        return
    }
    const newUser = {
        name: req.body.name,
        lastName: req.body.lastName,
        birthDate: new Date(req.body.birth),
        username: req.body.username,
        email: req.body.email,
        password: bcrpyt.hashSync(req.body.password, 12),
        plan: req.body.plan,
        posts: []
    }

    User.getUser().insertOne(newUser, async (err) => {
        if (err) {
            let documentErr = 'MongoServerError: Document failed validation'
            if (err.toString() === documentErr) {
                res.status(406).send('Email not correct')
                return
            } else throw err
        }
        let chosenPlan = await Plan.getPlans().findOne({
            type: newUser.plan
        })
        if (chosenPlan.type === 'free') return res.send(`User:\n${newUser.name}\n${newUser.lastName}\n${newUser.username}\n${newUser.email}\nwas registered successfully with Free Plan!`)
        if (chosenPlan.type === 'cheap') return res.send(`User:\n ${newUser.name}\n${newUser.lastName}\n${newUser.username}\n${newUser.email}\nwas registered successfully with Cheap Plan!`)
        if (chosenPlan.type === 'premium') return res.send(`User:\n ${newUser.name}\n${newUser.lastName}\n${newUser.username}\n${newUser.email}\nwas registered successfully with Premium Plan!`)
    })
}

function passwordValidation(req,res,user) {
    let passwordIsValid = bcrpyt.compareSync(
        req.body.password,
        user.password
        )
    if (!passwordIsValid) return res.status(401).send('Invalid password!')
    let token = jwt.sign(
        { id: user.id }, 
        config.secret, {
            expiresIn: 172800 // 48 hours
        })
    req.session.token = token
    res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        plan: user.plan.type
    })
}

exports.signIn = (req,res) => {
    User.getUser().findOne({ username: req.body.username }, (err,user) => {
        if (err) {
            throw err
        }
        if (!user) {
            if (req.body.email) {
                User.getUser().findOne({ email: req.body.email}, (err, email) => {
                    if (err) {
                        res.status(500).send(err)
                        return
                    }
                    if (!email) return res.status(404).send('Email not found!')
                    passwordValidation(req,res,email)
                })
                return
            } else return res.status(404).send('User not found!')
        }
        passwordValidation(req,res,user)
    })
}

exports.signOut = async (req,res) => {
    try {
        req.session.token = null
        return res.status(200).send('Logout!')
    } catch (err) {
        this.next(err)
    }
}