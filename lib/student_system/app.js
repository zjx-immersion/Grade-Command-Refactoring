'use strict';

const readline = require('readline');
const System = require('./System');

const sysReadLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let system = new System(sysReadLine);
console.log(System.getWELCOMEMsg());
console.log(System.getCommandMsg());
sysReadLine.on('line', (input) => console.log(system.parseInput(input)));