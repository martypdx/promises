const fs = require('fs/promises');
const path = require('path');
const copyFile = require('../lib/copy-file');

const { CI, HOME } = process.env;
const BASE_DIR = CI ? HOME : __dirname;
const TEST_FOLDER = path.join(BASE_DIR, 'copy-file');

describe('copy file', () => {
  
  beforeEach(async () => {
    await fs.rm(TEST_FOLDER, { force: true, recursive: true });
    await fs.mkdir(TEST_FOLDER, { recursive: true });
  });
  
  it('from src to dest', async () => {
    const srcPath = path.join(TEST_FOLDER, 'file-to-copy.txt'); 
    const destPath = path.join(TEST_FOLDER, 'copied-file.txt'); 
    await fs.writeFile(srcPath, 'Copy me');

    await copyFile(srcPath, destPath);
    const copied = await fs.readFile(destPath, { encoding: 'utf-8' });
    expect(copied).toBe('Copy me');
  });
  
  it('returns bad file error when no src', async () => {
    expect.assertions(1);
    const badFileName = path.join(TEST_FOLDER, 'bad-file.txt');
    const destPath = path.join(TEST_FOLDER, 'file-to-copy.txt'); 

    try {
      await copyFile(badFileName, destPath);
    }
    catch(err) {
      expect(err.message).toMatch('bad file name');
    }
  });
});
