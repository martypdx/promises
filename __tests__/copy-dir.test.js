const fs = require('fs/promises');
const path = require('path');
const copyDir = require('../lib/copy-dir');

const { CI, HOME } = process.env;
const BASE_DIR = CI ? HOME : __dirname;
const TEST_FOLDER = path.join(BASE_DIR, 'copy-dir');
const SRC_DIR = path.join(TEST_FOLDER, 'src-dir'); 
const DEST_DIR = path.join(TEST_FOLDER, 'dest-dir');

describe('copy dir', () => {

  beforeEach(async () => {
    await fs.rm(TEST_FOLDER, { force: true, recursive: true });
    await fs.mkdir(SRC_DIR, { recursive: true });
    await Promise.all([
      fs.writeFile(path.join(SRC_DIR, 'file1.txt'), 'file 1'),
      fs.writeFile(path.join(SRC_DIR, 'file2.txt'), 'file 2'),
      fs.writeFile(path.join(SRC_DIR, 'file3.txt'), 'file 3'),
    ]);
  });

  it('from src to dest', async () => {
    await copyDir(SRC_DIR, DEST_DIR);
    const copiedFiles = await fs.readdir(DEST_DIR);
    expect(copiedFiles.length).toBe(3);
  });
  

});
