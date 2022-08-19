checkDuplicateUsernameOrEmail = (req,res,next) => { 
    const User = require('../../models/user.model')

    User.getUser().findOne({
        username: req.body.username
    }, (err,user) => {
        if (err) {
            res.status(500).send(err)
            return
        }
        if (user) {
            res.status(400).send('Error! Username is aleready in use!')
            return
        } else {
            User.getUser().findOne({
                email: req.body.email
            }, (err,user) => {
                if (err) {
                    res.status(500).send(err)
                    return
                }
                if (user) {
                    res.status(400).send('Error! Email is already in use!')
                    return
                }
                next()
            })
        }
    })
}

checkPlanExisted = async (req,res,next) => {
    const Plans = require('../../models/plan.model')
    // const idPlans = Plans.getPlans().find().map(x => x._id).toArray()
    let bool = false
    let plans = await Plans.getPlans().find().map(x => x.type).toArray()
    for (let i = 0; i < plans.length; i++) {
        if (plans[i] === req.body.plan) {
            bool = true
            break
        }
    }
    if (!bool) {
        res.status(400).send(`Error! Role ${req.body.plan} does not exist!`)
        return
    }
    next()
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkPlanExisted
}

module.exports = verifySignUp