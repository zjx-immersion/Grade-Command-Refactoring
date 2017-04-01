'use strict';

const readline = require('readline');
const System = require('./System');

const sysReadLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let system = new System();

sysReadLine.on('line', (input) => {
    const msg = system.parseInput(input);
    console.log(msg)
    msg === System.getTERMINATEMsg() &&  sysReadLine.close()
});