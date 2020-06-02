const express = require('express');
const bp = require('body-parser')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');

app.use(express.static(__dirname));
app.use(express.json());
app.use(bp.urlencoded({ extended: true }));

const Message = mongoose.model('message', {
  name: String,
  text: String
});

app.get('/api/messages', (req, res, next) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  })
})

app.post('/api/messages', (req, res, next) => {
  const message = new Message(req.body)
  message.save((err) => {
    if (err) {
      sendStatus(500);
    } else {
      io.emit('message', req.body)
      res.sendStatus(200);
    }
  })

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
