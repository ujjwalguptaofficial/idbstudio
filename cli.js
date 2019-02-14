#!/usr/bin/env node

const program = require('commander');
const server = require("./server");
const generate = require('./generate');
const loader = require('loading-indicator');
const sqlweb = require('sqlweb/dist/sqlweb.node');

program.option('-s, --start', 'Start the idbstudio').
option('-p --port [value]', 'Configure the specified port', 3000).
option('-g --generate', 'Generate the idbstudio files').
option('-f --folder [folderName]', 'Take the folder name', 'idbstudio').
option('--sql [query]', 'convert sql to jsstore equivalent').
parse(process.argv);

if (program.start) {
    console.log('Starting IDBStudio');
    server.initServer(program.port);
} else if (program.generate) {
    const timer = loader.start('Generating...');
    generate.copy(program.folder).then(() => {
        console.log('Files generated');
        loader.stop(timer, false);
    }).catch((err) => {
        console.log('error occured while generating');
        console.error(err);
        loader.stop(timer);
    })
} else if (program.sql) {
    try {
        const result = sqlweb.parseSql(program.sql);
        console.log(JSON.stringify(result));
    } catch (ex) {
        console.log(ex);
    }
}