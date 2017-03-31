'use strict';
const RedirectStudentCommand = require('./command/RedirectStudentCommand');
const RedirectStudentReportCommand = require('./command/RedirectStudentReportCommand');
const CloseCommand = require('./command/CloseCommand');
const RedirectMainCommand = require('./command/RedirectMainCommand');
const AddStudentCommand = require('./command/AddStudentCommand');
const StudentSystemService = require('./StudentSystemService')
const BuildStudentReportCommand = require('./command/BuildStudentReportCommand')

const ADD_STUDENT = 'ADD_STUDENT';
const QUERY_SCORE = 'QUERY_SCORE';
const TERMINATE = 'TERMINATE';
const COMMAND = 'COMMAND';
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
        this.consoleState = COMMAND;
        this.studentSystemService = new StudentSystemService()
    }

    parseCommand(input) {
        let result = '';
        switch (input) {
            case INPUT_STUDENT:
                result = new RedirectStudentCommand()
                break;
            case INPUT_STUDENT_NUMBER:
                result = new RedirectStudentReportCommand()
                break;
            case CLOSE:
                result = new CloseCommand()
                break;
            default:
                result = new RedirectMainCommand()
                break;
        }
        return result;
    }

    parseInput(input) {
        let command;
        switch (this.consoleState) {
            case COMMAND:
                command = (input) => this.parseCommand(input);
                break;
            case ADD_STUDENT:
                command = (input) => new AddStudentCommand(this.studentSystemService);
                break;
            case QUERY_SCORE:
                command = (input) => new BuildStudentReportCommand(this.studentSystemService);
                break;
        }
        let router = command(input).exec(input);
        this.consoleState = router.status
        return router.msg
    }


    static getWELCOMEMsg() {
        return WELCOME;
    }

    static getTERMINATEMsg() {
        return GOODBYE;
    }

    static getCommandMsg() {
        return COMMAND_MSG;
    }

}

module.exports = System;
