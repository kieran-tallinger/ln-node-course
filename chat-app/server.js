const express = require('express');
const bp = require('body-parser')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http)

app.use(express.static(__dirname));
app.use(express.json());
app.use(bp.urlencoded({ extended: true }));

const messages = [
  { name: "Van", text: "First" },
  { name: "Caroline", text: "Second" }
]

app.get('/api/messages', (req, res, next) => {
  res.send(messages);
})

app.post('/api/messages', (req, res, next) => {
  console.log(req.body)
  messages.push(req.body)
  res.sendStatus(200);
})

const server = app.listen(3000, () => {
  console.log('server is listening in on port', server.address().port)
});
