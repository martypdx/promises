const fs = require('fs/promises');

async function copyFile(src, dest) {
  return fs.readFile(src)
    .then(file => {
      return fs.writeFile(dest, file);
    });
}

module.exports = copyFile;
