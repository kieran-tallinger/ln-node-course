$(() => startApp());

const messageBoard = $('#messages')

function startApp() {
  $('body').on('click', '#send', sendMessage);
  getMessages();
}

function getMessages() {
  $.ajax({
    url: 'http://localhost:3000/api/messages',
    method: "GET",
    success: handleGetMessage,
    error: getMessageError
  })
}

function sendMessage(message) {
  if (!event) {
    messageBoard.append(`<div class="mb-3"><h4> ${message.name} </h4> <p> ${message.text} </p></div>`);
  } else {
    event.preventDefault();
    messageBoard.append(`<div class="mb-3"><h4> ${message.name} </h4> <p> ${message.text} </p></div>`);
  }
}

function handleGetMessage(data) {
  data.forEach(sendMessage);
}

function getMessageError(err) {
  console.error(err);
}
