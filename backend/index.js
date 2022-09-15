const express = require('express');
const app = express();

const cors = require("cors");

let bodyParser = require('body-parser')

require("dotenv").config({ path: "./config.env" });
let helmet = require('helmet')
let session = require('express-session')

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }))


let expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 ora

app.use(cors());
app.use(express.json());
app.use(helmet())
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  name: 'sessionId',
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  expires: expiryDate,
  cookie: {
    // settato a true funziona solo con https
    // secure: true,
    httpOnly: true
  }
}))

const dbo = require("./config/conn");

/* salvataggio in locale dei messaggi
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:8080",
  },
});

const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");


const { InMemorySessionStore } = require("./middlewares/middleware_chat/sessionStore");
const sessionStore = new InMemorySessionStore();

const { InMemoryMessageStore } = require("./middlewares/middleware_chat/messageStore");
const messageStore = new InMemoryMessageStore();

io.use((socket, next) => {
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
  sessionStore.saveSession(socket.sessionID, {
    userID: socket.userID,
    username: socket.username,
    connected: true,
  });

  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  socket.join(socket.userID);

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

  socket.broadcast.emit("user connected", {
    userID: socket.userID,
    username: socket.username,
    connected: true,
    messages: [],
  });

  socket.on("private message", ({ content, to }) => {
    const message = {
      content,
      from: socket.userID,
      to,
    };
    socket.to(to).to(socket.userID).emit("private message", message);
    messageStore.saveMessage(message);
  });

  socket.on("disconnect", async () => {
    const matchingSockets = await io.in(socket.userID).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      socket.broadcast.emit("user disconnected", socket.userID);
      sessionStore.saveSession(socket.sessionID, {
        userID: socket.userID,
        username: socket.username,
        connected: false,
      });
    }
  });
});*/

/*
httpServer.listen(PORT, () => {
  dbo
  .connectToServer()
  .catch(console.error)
  console.log(`server listening at http://localhost:${PORT}`)
});*/

const PORT = process.env.PORT || 3000;

const server = app.listen(
  PORT,
  console.log(`server listening at http://localhost:${PORT}`)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  })

  socket.on("join chat", (room) => {
    socket.join(room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    let chat = newMessageReceived.chat;

    if(!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if(user._id == newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    socket.leave(userData._id);
  })
})

app.get('/', (req,res) => {
  res.json('Welcome to Bazar web site!')
})

require('./routes/auth')(app)

app.use(require("./routes/Offered_Services"));
app.use(require("./routes/Required_Services"));

app.use(require("./routes/Unauthorised"))

app.use(require("./routes/user_corporate"))

//inizio codice modulare chat
app.use(require("./routes/chats"));
app.use(require("./routes/message"));