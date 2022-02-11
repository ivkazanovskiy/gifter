const socket = io();

const chatBox = document.querySelector('.chatBox');

function addMessage(message, userId) {
  const newMessage = document.createElement('div');
  newMessage.classList.add('chatMessage');
  newMessage.innerText = `${userId}: ${message}`;
  chatBox.appendChild(newMessage);
}

document.chatForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const messageField = event.target.text;
  const userId = event.target.dataset.id;
  const message = messageField.value;
  if (message) {
    messageField.value = '';
    socket.emit('toServer:message', message, userId);
    addMessage(message, userId);
  }
});

socket.on('toClient:message', (message, userId) => {
  addMessage(message, userId);
});
