const { removeSync, ensureDirSync, copySync } = require('fs-extra');

removeSync('docs');
ensureDirSync('docs');
copySync('./dist', './docs');