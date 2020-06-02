const express = require('express');
const bp = require('body-parser')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');

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
  messages.push(req.body)
  io.emit('message', req.body)
  res.sendStatus(200);
})

io.on('connection', (socket) => {
  console.log("A new User connected on", socket.id)
})

const dbURL = "mongodb+srv://grawp3:SYuOEYVESrZFeBAh@mango-farm-xcpwy.gcp.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Successful connection to MongoDB')
})

const server = http.listen(3000, () => {
  console.log('server is listening in on port', server.address().port)
});
