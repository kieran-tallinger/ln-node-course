$(() => startApp());

const messageBoard = $('#messages')

function startApp() {
  $('body').on('click', '#send', sendMessage);
}

function sendMessage(message) {
  event.preventDefault();
  messageBoard.append(`<div class="mb-3"><h4> ${message.name} </h4> <p> ${message.text} </p></div>`);
}
