module.exports = {
    getPlans: () => {
        const db = require('../config/conn')
        return db.getDb().collection('Plan')
    } 
}