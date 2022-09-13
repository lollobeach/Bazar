module.exports = {
    freePlan: (req,res) => {
        res.status(200).send('Free Plan')
    },

    cheapPlan: (req,res) => {
        res.status(200).send('Cheap Plan')
    },

    premium: (req,res) => {
        res.status(200).send('Premium Plan')
    }
}