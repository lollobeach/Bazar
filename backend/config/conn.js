const {MongoClient} = require("mongodb");
require('dotenv').config({path: "../config.env"})
//connection url
const Db =  process.env.ATLAS_DB;
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let _db;

function createPlans(db) {
    db.collection('Plan')
        .insertMany([
            { type: 'free' },
            { type: 'cheap' },
            { type: 'premium' }
        ])
}

function createUser(db) {
    db.createCollection('User', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['name', 'lastName', 'birthDate', 'username', 'email', 'password', 'plan'],
                properties: {
                    name: {
                        bsonType: 'string'
                    },
                    lastName: {
                        bsonType: 'string'
                    },
                    birthDate: {
                        bsonType: 'date'
                    },
                    username: {
                        bsonType: 'string'
                    },
                    email: {
                        bsonType: 'string',
                        pattern: '^\\w+([\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'
                    },
                    password: {
                        bsonType: 'string'
                        
                    },
                    plan: {
                        bsonType: 'string'
                    }
                }
            }
        }
    })
}

function createCorporate(db) {
    db.createCollection('Corporate', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                    name: {
                        bsonType: 'string'
                    },
                    email: {
                        bsonType: 'string'
                    },
                    password: {
                        bsonType: 'string'
                    }
                }
            }
        }
    })
}

module.exports = {
    connectToServer: async function main() {
        client.connect( async (err, db) => {
            if(db){
                // Remember to delete this line
                //db.runCommand({ "dropDatabase": 1 })
                _db = db.db(process.env.DB_NAME);
                let collection = await _db.listCollections().map(x => x.name).toArray()
                if (!(collection.includes('User') && collection.includes('Plan') && collection.includes('Corporate'))) {
                    createPlans(_db)
                    createCorporate(_db)
                    createUser(_db)
                    console.log('Collections succesfully created')
                }
                console.log("Succesfully entered in database BAZAR"); 
            }
            return err;
        });
        console.log('Connected successfully to server');
        const db = client.db(process.env.DB_NAME);
    },

    getDb: function(){
        return _db;
    },
};