const fs = require('fs/promises');

async function copyFile(src, dest) {
  return fs.readFile(src)
    .then(file => {
      return fs.writeFile(dest, file, { mode: '777' });
    })
    .catch(error => {
      if(error.code === 'ENOENT') {
        throw new Error('bad file name');
      }
      throw error;
    });
}

module.exports = copyFile;
