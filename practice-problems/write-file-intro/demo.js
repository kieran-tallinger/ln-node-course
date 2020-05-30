const fs = require('fs');

const data = {
  name: 'Indy'
}

fs.writeFile('data.json', JSON.stringify(data), (err) => {
  console.log("Write File Completed", err);
})
