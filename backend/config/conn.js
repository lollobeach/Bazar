const {MongoClient} = require("mongodb");
require('dotenv').config({path: "../config.env"})
const Db =  process.env.ATLAS_DB;
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let _db;

function createOfferedService(db) {
    db.createCollection('Offered_Service', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['title', 'description', 'price', 'place', 'picture', 'dataCreation', 'lastUpdate', 'user'],
                properties: {
                    title: {
                        bsonType: 'string'
                    },
                    description: {
                        bsonType: 'string',
                        maxLength: 500
                    },
                    price: {
                        bsonType: 'string',
                    },
                    place: {
                        bsonType: 'string'
                    },
                    picture: {
                        bsonType: 'string'
                    },
                    dataCreation: {
                        bsonType: 'date'
                    },
                    lastUpdate: {
                        bsonType: 'date'
                    },
                    user: {
                        bsonType: 'string'
                    }
                }
            }
        }
    })
}

function createRequiredService(db) {
    db.createCollection('Required_Service', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['title', 'description', 'place', 'picture', 'dataRequired','dataCreation', 'lastUpdate', 'user'],
                properties: {
                    title: {
                        bsonType: 'string'
                    },
                    description: {
                        bsonType: 'string',
                        maxLength: 500
                    },
                    place: {
                        bsonType: 'string'
                    },
                    picture: {
                        bsonType: 'string'
                    },
                    dataRequired: {
                        bsonType: 'date'
                    },
                    dataCreation: {
                        bsonType: 'date'
                    },
                    lastUpdate: {
                        bsonType: 'date'
                    },
                    user: {
                        bsonType: 'string'
                    }
                }
            }
        }
    })
}

function createUser(db) {
    db.createCollection('User', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['name', 'lastName', 'birthDate', 'username', 'email', 'password', 'plan', 'picture', 'offeredServices', 'requiredServices'],
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
                        bsonType: 'string',
                        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\\[-`{-~]).{6,64}$'
                    },
                    plan: {
                        bsonType: 'string'
                    },
                    picture: {
                        bsonType: 'string'
                    },
                    offeredServices: {
                        bsonType: 'array'
                    },
                    requiredServices: {
                        bsonType: 'array'
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
                required: ['name', 'countryOfResidence', 'address', 'iva', 'email', 'password', 'picture', 'offeredServices'],
                properties: {
                    name: {
                        bsonType: 'string'
                    },
                    countryOfResidence: {
                        bsonType: 'string'
                    },
                    address: {
                        bsonType: 'string'
                    },
                    iva: {
                        bsonType: 'string'
                    },
                    email: {
                        bsonType: 'string',
                        pattern: '^\\w+([\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'
                    },
                    password: {
                        bsonType: 'string',
                        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\\[-`{-~]).{6,64}$'
                    },
                    picture: {
                        bsonType: 'string'
                    },
                    offeredServices: {
                        bsonType: 'array'
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
                _db = db.db(process.env.DB_NAME);
                let collection = await _db.listCollections().map(x => x.name).toArray()
                if (!(collection.includes('User') && collection.includes('Required_Service') && collection.includes('Corporate') && collection.includes('Offered_Service'))) {
                    createOfferedService(_db)
                    createRequiredService(_db)
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
    }
};