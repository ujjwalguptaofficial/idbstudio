const express = require('express');
const sqlweb = require('sqlweb/dist/sqlweb.node');
exports.initExpress = function (port) {
    if (port == null) {
        port = 3000;
    }
    const app = express();

    app.use(express.static(__dirname + '/dist'))

    app.listen(port, () =>
        console.log(`IDBStudio is runing on port ${port}!`)
    )
}

try {
    const result = sqlweb.parseSql("select * fdrom customers");
    console.log(JSON.stringify(result));
} catch (ex) {
    console.log(ex);
}
// .then(result => {
//     console.log(JSON.stringify(result));
// }).catch(err => {
//     console.error(err);
// })