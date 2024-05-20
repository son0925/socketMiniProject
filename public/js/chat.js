const socket = io('ws://localhost:4000');

const query = new URLSearchParams(location.search);
// ?username=John&room=Roomy'

const username = query.get('username');

const room = query.get('room');




socket.emit('join', {username, room}, (error) => {
  if (error) {
    alert(error);
    location.href = '/';
  }
}) 

socket.on('message')