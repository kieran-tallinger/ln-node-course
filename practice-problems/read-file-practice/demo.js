const fs = require('fs');
const data = require('./data.json');

console.log(data.name);

fs.readFile("./data.json", "utf-8", (err, data) => {
  const demoData = JSON.parse(data);
  console.log(demoData.name);
})
