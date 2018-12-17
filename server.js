exports.initServer = function (port) {
    if (port == null) {
        port = 3000;
    }
    global.port = port;
    const server = require("./server/build/app");
}