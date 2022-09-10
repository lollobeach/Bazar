module.exports = {
    getRequiredServices: () => {
        const db = require('../config/conn');
        return db.getDb().collection('Required_Service');
    } 
}