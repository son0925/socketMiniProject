const express = require('express');
const app = express();
const port = 4000;
const path = require('path');

const http = require('http');
const {Server} = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);


io.on('connection', (socket) => {
  console.log(socket);

  socket.on('join', () => {});
  
  socket.on('message', () => {});

  socket.on('disconnect', () => {});
})


const publicDirectoryPath = path.join(__dirname, '../', 'public');
app.use(express.static(publicDirectoryPath));


server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})