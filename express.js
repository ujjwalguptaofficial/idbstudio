const express = require('express');

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