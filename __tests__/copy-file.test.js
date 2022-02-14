const fs = require('fs/promises');
const path = require('path');
const copyFile = require('../lib/copy-file');

const COPY_FOLDER = path.join(__dirname, 'copy');
const FILE_TO_COPY = path.join(COPY_FOLDER, 'file-to-copy.txt'); 
const COPIED_FILE = path.join(COPY_FOLDER, 'copied-file.txt');

describe('copy file', () => {
  beforeEach(async () => {
    return fs.rm(COPIED_FILE, { force: true });
  });

  it('from src to dest', async () => {
    await copyFile(FILE_TO_COPY, COPIED_FILE);
    const copied = await fs.readFile(COPIED_FILE, { encoding: 'utf-8' });
    expect(copied).toBe('Copy me');
  });

});
