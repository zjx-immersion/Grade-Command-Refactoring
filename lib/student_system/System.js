'use strict';
const CloseCommand = require('./command/CloseCommand');
const RedirectMainCommand = require('./command/DisplayMainViewCommand');
const AddStudentCommand = require('./command/AddStudentCommand');
const StudentSystemService = require('./StudentSystemService')
const BuildStudentReportCommand = require('./command/BuildStudentReportCommand')
const ChooseMainMenuCommand = require('./command/ChooseMainMenuCommand')

const ADD_STUDENT = 'ADD_STUDENT';
const QUERY_SCORE = 'QUERY_SCORE';
const TERMINATE = 'TERMINATE';
const MENU_COMMAND_EXEC = 'MENU_COMMAND_EXEC';
const MAIN = 'MAIN';

const WELCOME = `欢迎来到学生成绩控制台记录系统  Powered By Melo Gao`;

const GOODBYE = `see you`;

class System {

    constructor() {
        this.consoleState = MAIN;
        this.studentSystemService = new StudentSystemService()

        this.routeCommandMap = [
            {status: MAIN, cmd: new RedirectMainCommand()},
            {status: MENU_COMMAND_EXEC, cmd: new ChooseMainMenuCommand()},
            {status: ADD_STUDENT, cmd: new AddStudentCommand()},
            {status: QUERY_SCORE, cmd: new BuildStudentReportCommand()}
        ]
    }

    input(input) {

        let command = this.routeCommandMap.find(cmdObj => cmdObj.status === this.consoleState).cmd
        let router = command.exec(input);
        this.consoleState = router.status
        return router.msg
    }


    static getTERMINATEMsg() {
        return GOODBYE;
    }

}

module.exports = System;
