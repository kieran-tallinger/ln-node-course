$(() => startApp());

const messageBoard = $('#messages')

function startApp() {
  $('body').on('click', '#form', handleSubmit);
  getMessages();
}

function getMessages() {
  $.ajax({
    url: 'http://localhost:3000/api/messages',
    method: "GET",
    success: handleGetMessage,
    error: handleError
  })
}

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
}

function placeMessage(message) {
  if (!event) {
    messageBoard.append(`<div class="mb-3"><h4> ${message.name} </h4> <p> ${message.text} </p></div>`);
  } else {
    event.preventDefault();
    messageBoard.append(`<div class="mb-3"><h4> ${message.name} </h4> <p> ${message.text} </p></div>`);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  console.log(event)
  let newMessage = new FormData(event.currentTarget);
  const newName = newMessage.get('name');
  const newText = newMessage.get('text');
  postMessage(newName, newText);
  event.currentTarget.reset();
}

function handleGetMessage(data) {
  data.forEach(placeMessage);
}

function handlePostMessage(data) {
  placeMessage(data);
}

function handleError(err) {
  console.error(err);
}
