module.exports = {
    getCorporates: () => {
        const db = require('../config/conn')
        return db.getDb().collection('Corporate')
    }
}