const fs = require('fs/promises');
const path = require('path');
const copyFile = require('./copy-file');

async function copyDir(src, dest) {
  await fs.mkdir(dest);
  const files = await fs.readdir(src);
  await Promise.all(files.map(file => {
    const sourcePath = path.join(src, file);
    const destPath = path.join(dest, file);
    return copyFile(sourcePath, destPath);
  }));
}

module.exports = copyDir;
