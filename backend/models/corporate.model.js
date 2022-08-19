module.exports = {
    getCorporates: (callback) => {
        const db = require('../db/conn')
        const database = db.getDb((err) => {
            if (err) throw err
            else return database.collection('Corporate')
        })
    }
}