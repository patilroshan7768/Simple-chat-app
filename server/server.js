const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors({ origin: "*" })); // allow all origins for testing

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // allow all origins
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (username) => {
    socket.username = username;
    socket.broadcast.emit('user_joined', { username });
  });

  socket.on('send_message', (message) => {
    io.emit('receive_message', message); // broadcast to all
  });

  socket.on('disconnect', () => {
    if (socket.username) {
      socket.broadcast.emit('user_left', { username: socket.username });
    }
    console.log('User disconnected:', socket.id);
  });
});

const PORT =  process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
