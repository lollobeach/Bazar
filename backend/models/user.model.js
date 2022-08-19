module.exports = {
    getUser: () => {
        const db = require('../config/conn')
        return db.getDb().collection('User')
    }
}