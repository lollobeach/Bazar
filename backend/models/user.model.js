module.exports = {
    getUser: () => {
        const db = require('../db/conn')
        return db.getDb().collection('User')
    }
}