const {MongoClient} = require("mongodb");
//connection url
const Db =  process.env.ATLAS_DB;
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
//db name
const dbName = 'services';

var _db;

module.exports = {
    /*connectToServer: function(callback){
        client.connect(function (err, db) {
            if(db){
                _db = db.db(dbName);
                console.log("Successfully connected to MongoDB."); 
            }
            return callback(err);
        });
    },*/
    connectToServer: async function main() {
        client.connect( (err, db) => {
            if(db){
                _db = db.db(dbName);
                console.log("Successfully entered in collection: services."); 
            }
            return err;
        });
        console.log('Connected successfully to server');
        const db = client.db(dbName);
    },

    getDb: function(){
        return _db;
    },
};