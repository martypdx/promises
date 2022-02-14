const fs = require('fs/promises');
const path = require('path');
const copyFile = require('../lib/copy-file');

const { CI, HOME } = process.env;
const BASE_DIR = CI ? HOME : __dirname;
const TEST_FOLDER = path.join(BASE_DIR, 'copy-file');
const FILE_TO_COPY = path.join(TEST_FOLDER, 'file-to-copy.txt'); 
const COPIED_FILE = path.join(TEST_FOLDER, 'copied-file.txt');

describe('copy file', () => {

  beforeEach(async () => {
    await fs.rm(TEST_FOLDER, { force: true, recursive: true });
    await fs.mkdir(TEST_FOLDER, { recursive: true });
    await fs.writeFile(FILE_TO_COPY, 'Copy me');
  });

  it('from src to dest', async () => {
    await copyFile(FILE_TO_COPY, COPIED_FILE);
    const copied = await fs.readFile(COPIED_FILE, { encoding: 'utf-8' });
    expect(copied).toBe('Copy me');
  });
  
  it('returns bad file error when no src', async () => {
    expect.assertions(1);
    const badFileName = path.join(TEST_FOLDER, 'bad-file.txt');

    try {
      await copyFile(badFileName, COPIED_FILE);
    }
    catch(err) {
      expect(err.message).toMatch('bad file name');
    }
  });
});
