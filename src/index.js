const express = require('express');
const app = express();
const port = 4000;
const path = require('path');

const http = require('http');
const {Server} = require('socket.io');
const { addUser } = require('../utils/users');
const { generateMessage } = require('../utils/messages');
const server = http.createServer(app);
const io = new Server(server);


io.on('connection', (socket) => {
  console.log(socket);

  socket.on('join', (options, callback) => {
    const {error, user} = addUser({id: socket.id, ...options});
    if (error) {
      return callback(error)
    }

    socket.join(user.room);

    socket.emit('message', generateMessage('Admin', `${user.room}방에 오신 걸 환영합니다.`))
    socket.broadcast.to(user.room).emit('message', generateMessage('', `${user.name}가 방에 참여했습니다`))

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    })
  });
  
  socket.on('message', () => {});

  socket.on('disconnect', () => {});
})


const publicDirectoryPath = path.join(__dirname, '../', 'public');
app.use(express.static(publicDirectoryPath));


server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})