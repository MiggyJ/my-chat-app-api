const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config()
const { createServer } = require("http");
const { Server } = require("socket.io");

const { sequelize } = require('./models')
const app = express()

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: 'http://localhost:3000', }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true,
}));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/api', require('./routes'))

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send({ error: true, message: 'Unauthorized' });
  } else {
    next(err);
  }
});


io.on('connection', socket => {

  socket.on('user-session', (username) => {
    socket.join(username)
    console.log(socket.rooms.values())
  })

  socket.on('new-request', (username) => {
    socket.to(username).emit('request-notification')
  })

  socket.on('accepted-request', (username) => {
    socket.to(username).emit('refresh-contacts')
  })

  socket.on('select-inbox', (inbox) => {
    socket.join(inbox)
    console.log(socket.rooms.values())
  })

  socket.on('send-message', (inbox, message) => {
    socket.to(inbox).emit('receive-message', message)
  })
})

const PORT = process.env.PORT || 5000
httpServer.listen(PORT, () => {
  sequelize.authenticate().then(_ => console.log('database running'))
  console.log('Server running')
})
