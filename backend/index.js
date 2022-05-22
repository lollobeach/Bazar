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
  secret: 'pawn420giorgiosldgreenduccispina',
  name: 'sessionId',
  cookie: {
    secure: true,
    //httpOnly: true,
    //domain: 'example.com', to release in distribuition 
    //path: 'foo/bar',
    expires: expiryDate
  }
}))
//richiamo il file delle route
app.use(require("./routes/service"));
//connessione db
const dbo = require("./db/conn");



app.listen(port, () => {
    //connesiione al db
    dbo.connectToServer(function (err){
      if(err) console.error(err);
    });
    console.log(`Example app listening on port ${port}  `);
});