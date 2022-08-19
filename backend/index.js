//richiamo express
const express = require('express');
const app = express();
//richiamo cors service per evitare problemi dipendenze nodejs
const cors = require("cors");
//carica da variabili locali moduli da installare o variabili di ambienti da usare
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
//inizio codice per sicurezza header, cookies e sessioni
//richiamo helmet 
var helmet = require('helmet')
//richiamo express session
var session = require('express-session')

var expiryDate = new Date(Date.now() + 60 * 60 * 1000)

app.use(cors());
app.use(express.json());
app.use(helmet())
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  name: 'sessionId',
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            // settato a true funziona solo con https
            // secure: true,
            httpOnly: true
  }
}))

//connessione db
const dbo = require("./db/conn");

require('./routes/auth')(app)
require('./routes/user')(app)

app.listen(port, () => {
    //connesiione al db
    /*dbo.connectToServer(function (err){
      if(err) console.error(err);
    });*/
    dbo
    .connectToServer()
    .catch(console.error)
    console.log(`Example app listening on port ${port}  `);
});