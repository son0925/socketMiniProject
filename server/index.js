const http = require('http').createServer();
const io = require('socket.io')(http, {
  cors: {origin: '*'}
})

io.on('connection', (socket) => {
  console.log(`a user connected`);

  socket.on('message2', (msg) => {
    io.emit('message1', `${socket.id.substr(0,4)} : ${msg}`)
  })
})

const port = 4000;
http.listen(port, () => {
  console.log(`서버 실행`)
})