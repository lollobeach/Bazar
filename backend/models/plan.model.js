module.exports = {
    getPlans: () => {
        const db = require('../db/conn')
        return db.getDb().collection('Plan')
    } 
}