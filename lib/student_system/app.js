'use strict';

const readline = require('readline');
const System = require('./System');

const sysReadLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let system = new System();

function lunchSystem(display) {
    sysReadLine.question(display + '\r\n', (input) => {
        const msg = system.input(input);
        lunchSystem(msg)
        msg === System.getTERMINATEMsg() && sysReadLine.close()
    });
}

lunchSystem(system.input());