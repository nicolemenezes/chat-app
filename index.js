const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  serveClient: true
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a new user has connected', socket.id);

  socket.on('chat message', (msg) => {
    console.log('a new user message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});