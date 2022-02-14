const fs = require('fs/promises');

async function copyFile(src, dest) {
  try {
    const file = await fs.readFile(src);
    await fs.writeFile(dest, file);
  }
  catch(err) {
    if(err.code === 'ENOENT') {
      throw new Error('bad file name ' + src);
    }
    throw err;
  }
}

module.exports = copyFile;
