module.exports = {
    getOfferedServices: () => {
        const db = require('../config/conn')
        return db.getDb().collection('Offered_Service')
    }
}