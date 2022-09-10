checkDuplicateUsernameOrEmail = (req,res,next) => { 
    const User = require('../../models/user.model')

    User.getUser().findOne({
        username: req.body.username
    }, async (err,user) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err)
        }
        const _user = await user
        if (_user) return res.status(400).send('Error! Username is aleready in use!')
        User.getUser().findOne({
                email: req.body.email
            }, async (err,user) => {
            if (err) {
                console.log(err)
                return res.status(500).send(err)
            }
            const _user = await user
            if (_user) return res.status(400).send('Error! Email is already in use!')
            next()
        })
    })
}

checkPlanExisted = async (req,res,next) => {
    let bool = false
    let plans = ['free', 'cheap', 'premium']
    for (let i = 0; i < plans.length; i++) {
        if (plans[i] === req.body.plan) {
            bool = true
            break
        }
    }
    if (!bool) return res.status(400).send(`Error! Role ${req.body.plan} does not exist!`)
    next()
}

checkDuplicateCorporate = async (req,res,next) => {
    const Corporate = require('../../models/corporate.model')

    await Corporate.getCorporates().findOne({ name: req.body.name}, async (err,corporate) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Error')
        }
        const _corporate = await corporate
        if (_corporate) return res.status(400).send('Error! Corporate already exist')
        Corporate.getCorporates().findOne({
            email: req.body.email
            }, async (err,corporate) => {
                if (err) {
                console.log(err)
                return res.status(500).send(err)
            }
            const _corporate = await corporate
            if (_corporate) return res.status(400).send('Error! Email is already in use!')
            Corporate.getCorporates().findOne({
                via: req.body.iva
            }, async (err,corporate) => {
                if (err) {
                    console.log(err)
                    return res.status(500).send('Error')
                }
                const _corporate = await corporate
                if (_corporate) return res.status(400).send('Error! Iva is already in use!')
            })
            next()
        })
    })
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkPlanExisted,
    checkDuplicateCorporate
}

module.exports = verifySignUp