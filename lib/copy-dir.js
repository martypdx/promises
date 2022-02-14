const fs = require('fs/promises');
const path = require('path');
const copyFile = require('./copy-file');

async function copyDir(src, dest) {
  
  return fs.mkdir(dest)
    .then(() => {
      return fs.readdir(src);
    })
    .then(files => {
      return Promise.all(files.map(file => {
        const sourcePath = path.join(src, file);
        const destPath = path.join(dest, file);
        return copyFile(sourcePath, destPath);
      }));
    });
}

module.exports = copyDir;
