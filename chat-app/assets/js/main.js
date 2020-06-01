$(() => startApp());

const messageBoard = $('#messages');
const socket = io();

function startApp() {
  $('body').on('click', '#form', handleSubmit);
  getMessages();
};

function getMessages() {
  $.ajax({
    url: 'http://localhost:3000/api/messages',
    method: "GET",
    success: handleGetMessages,
    error: handleError
  })
};

function handleGetMessages(data) {
  data.forEach(placeMessage);
};

function getNewMessage() {
  $.ajax({
    url: 'http://localhost:3000/api/messages',
    method: "GET",
    success: handleNewMessage,
    error: handleError
  })
};

function handleNewMessage(data) {
  placeMessage(data[data.length - 1]);
};


function postMessage(name, text) {
  $.ajax({
    url: 'http://localhost:3000/api/messages',
    method: 'POST',
    data: {
      name: name,
      text: text
    },
    success: handlePostMessage,
    error: handleError
  })
};

function handlePostMessage(data) {
  getNewMessage();
};

function placeMessage(message) {
  if (!event) {
    messageBoard.append(`<div class="mb-3"><h4> ${message.name} </h4> <p> ${message.text} </p></div>`);
  } else {
    event.preventDefault();
    messageBoard.append(`<div class="mb-3"><h4> ${message.name} </h4> <p> ${message.text} </p></div>`);
  }
};

function handleSubmit(event) {
  event.preventDefault();
  if (event.target.id === 'send') {
    let newMessage = new FormData(event.currentTarget);
    const newName = newMessage.get('name');
    const newText = newMessage.get('text');
    postMessage(newName, newText);
    event.currentTarget.reset();
  }
};

function handleError(err) {
  console.error(err);
};
