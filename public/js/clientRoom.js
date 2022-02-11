const socket = io();

const chatBox = document.querySelector('.chatBox');
const { chatForm } = document;

function addMessage(message) {
  const newMessage = document.createElement('div');
  newMessage.classList.add('chatMessage');
  newMessage.innerText = `${message.userId}: ${message.text}`;
  chatBox.appendChild(newMessage);
}

chatForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const message = {
    text: chatForm.text.value,
    userId: chatForm.dataset.user_id,
    gifterId: chatForm.dataset.gifter_id,
    crewId: chatForm.dataset.crew_id,
  };

  if (message.text) {
    chatForm.text.value = '';
    socket.emit('toServer:message', message);
    addMessage(message);
  }
});

socket.on('toClient:message', (message, userId) => {
  addMessage(message);
});
