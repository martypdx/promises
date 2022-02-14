const fs = require('fs/promises');

async function copyFile(src, dest) {
  return fs.readFile(src)
    .then(file => {
      return fs.writeFile(dest, file);
    })
    .catch(error => {
      if(error.code === 'ENOENT') {
        throw new Error('bad file name ' + src);
      }
      throw error;
    });
}

module.exports = copyFile;
