#!/usr/bin/env node

const program = require('commander');
const express = require('./express');
const generate = require('./generate');
const loader = require('loading-indicator');

program.option('-s, --start', 'Start the idbstudio').
option('-p --port [value]', 'Configure the specified port', 3000).
option('-g --generate', 'Generate the idbstudio files').
option('-f --folder [folderName]', 'Take the folder name', 'idbstudio').
parse(process.argv);

if (program.start) {
    console.log('Starting IDBStudio');
    express.initExpress(program.port);
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
}