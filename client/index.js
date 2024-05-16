const socket = io('ws://localhost:4000')

socket.on('message1', (text) => {
  const element = document.createElement('li');
  element.innerHTML = text;
  document.querySelector('ul').appendChild(element);
})

document.querySelector('button').onclick = () => {
  const text = document.querySelector('input').value;
  socket.emit('message2', text);
}