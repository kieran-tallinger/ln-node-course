const fs = require('fs');

fs.readdir('../npm-intro', (err, data) => {
  console.log(data)
})
