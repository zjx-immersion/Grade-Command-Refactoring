'use strict';
const RedirectStudentCommand = require('./command/RedirectStudentCommand');
const RedirectStudentReportCommand = require('./command/RedirectStudentReportCommand');
const CloseCommand = require('./command/CloseCommand');
const RedirectMainCommand = require('./command/RedirectMainCommand');
const AddStudentCommand = require('./command/AddStudentCommand');
const StudentSystemService = require('./StudentSystemService')
const BuildStudentReportCommand = require('./command/BuildStudentReportCommand')
const MainMenuCommand = require('./command/MainMenuCommand')

const ADD_STUDENT = 'ADD_STUDENT';
const QUERY_SCORE = 'QUERY_SCORE';
const TERMINATE = 'TERMINATE';
const COMMAND = 'COMMAND';
const MAIN = 'MAIN';
const INPUT_STUDENT = '1';
const INPUT_STUDENT_NUMBER = '2';
const CLOSE = '3';


const WELCOME = `欢迎来到学生成绩控制台记录系统  Powered By Melo Gao`;
const COMMAND_MSG = `请输入命令:
1.添加学生
2.生成成绩单
3.退出`;

const GOODBYE = `see you`;

class System {

    constructor() {
        this.consoleState = MAIN;
        this.studentSystemService = new StudentSystemService()
    }


    parseInput(input) {

        let commandMap = [
            {status: MAIN, cmd: new RedirectMainCommand()},
            {status: COMMAND, cmd: new MainMenuCommand()},
            {status: ADD_STUDENT, cmd: new AddStudentCommand(this.studentSystemService)},
            {status: QUERY_SCORE, cmd: new BuildStudentReportCommand(this.studentSystemService)}
        ]

        let command = commandMap.find(cmdObj => cmdObj.status === this.consoleState).cmd
        let router = command.exec(input);
        this.consoleState = router.status
        return router.msg
    }


    static getTERMINATEMsg() {
        return GOODBYE;
    }

}

module.exports = System;
