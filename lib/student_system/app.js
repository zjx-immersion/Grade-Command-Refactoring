'use strict';

const readline = require('readline');
const System = require('./System');

const sysReadLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let system = new System(sysReadLine);
System.printWELCOME();
System.printCommand();
sysReadLine.on('line', (input) => system.parseInput(input));