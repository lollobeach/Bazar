const express = require('express');
const app = express();

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
app.use(require("./routes/auth"));
//connessione db
const dbo = require("./db/conn");


//inizio codice socket.io
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  //serve per far ricevere le richieste solo dal frontend
  cors: {
    origin: "http://localhost:8080",
  },
});

const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");

const { InMemorySessionStore } = require("./middleware/sessionStore");
const sessionStore = new InMemorySessionStore();

const { InMemoryMessageStore } = require("./middleware/messageStore");
const messageStore = new InMemoryMessageStore();

io.use((socket, next) => {
  //salva e recupera la sessione di un utente gia loggato
  //evita la creazione di un utente ad ogni ricarica di pagina
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      return next();
    }
  }
  //registra l'username da togliere dopo che unito con login greendux
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.sessionID = randomId();
  socket.userID = randomId();
  socket.username = username;
  next();
});

io.on("connection", (socket) => {
  //salva la sessione
  sessionStore.saveSession(socket.sessionID, {
    userID: socket.userID,
    username: socket.username,
    connected: true,
  });

  //dettagli della sessione
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  //unisce due scoet creano un canale
  socket.join(socket.userID);

  // printo tutti gli user esisententi
  const users = [];
  const messagesPerUser = new Map();
  messageStore.findMessagesForUser(socket.userID).forEach((message) => {
    const { from, to } = message;
    const otherUser = socket.userID === from ? to : from;
    if (messagesPerUser.has(otherUser)) {
      messagesPerUser.get(otherUser).push(message);
    } else {
      messagesPerUser.set(otherUser, [message]);
    }
  });
  sessionStore.findAllSessions().forEach((session) => {
    users.push({
      userID: session.userID,
      username: session.username,
      connected: session.connected,
      messages: messagesPerUser.get(session.userID) || [],
    });
  });
  socket.emit("users", users);

  //notifica connessione nuovo utente
  socket.broadcast.emit("user connected", {
    userID: socket.userID,
    username: socket.username,
    connected: true,
    messages: [],
  });

  //invio messaffio all'utente richiesto nel frontend
  socket.on("private message", ({ content, to }) => {
    const message = {
      content,
      from: socket.userID,
      to,
    };
    //salvataggio del messaggio
    socket.to(to).to(socket.userID).emit("private message", message);
    messageStore.saveMessage(message);
  });

  //notifica disconnect
  socket.on("disconnect", async () => {
    const matchingSockets = await io.in(socket.userID).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      // notify other users
      socket.broadcast.emit("user disconnected", socket.userID);
      // update the connection status of the session
      sessionStore.saveSession(socket.sessionID, {
        userID: socket.userID,
        username: socket.username,
        connected: false,
      });
    }
  });
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
);
