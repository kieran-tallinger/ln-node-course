const express = require('express');
const app = express();

app.use(express.static(__dirname))

const messages = [
  { name: "Van", text: "First" },
  { name: "Caroline", text: "Second" }
]
app.get('/api/messages', (req, res, next) => {
  res.send(messages);
})

const server = app.listen(3000, () => {
  console.log('server is listening in on port', server.address().port)
});
