const socket = io();

const chatBox = document.querySelector('.chatBox');
const { chatForm } = document;
const gifterId = chatForm.dataset.gifter_id;
const crewId = chatForm.dataset.crew_id;
const roomId = `${crewId}_${gifterId}`;

chatBox.scrollTop = chatBox.scrollHeight;

function addMessage(message) {
  const newMessage = document.createElement('div');
  newMessage.classList.add('chatMessage');
  newMessage.innerText = `${message.userId}: ${message.text}`;
  chatBox.appendChild(newMessage);

  chatBox.scrollTop = chatBox.scrollHeight;
}

socket.emit('toServer:joinRoom', roomId);

chatForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const message = {
    text: chatForm.text.value,
    userId: chatForm.dataset.user_id,
    gifterId,
    crewId,
  };

  if (message.text) {
    chatForm.text.value = '';
    socket.emit('toServer:message', message, roomId);
    addMessage(message);
  }
});

socket.on('toClient:message', (message, userId) => {
  addMessage(message);
});
