const fse = require('fs-extra');

exports.copy = function (folderName) {
    if (folderName == null) {
        folderName = 'idbstudio';
    }
    return fse.copy(__dirname + '/dist', folderName, {
        overwrite: true,
    });
}