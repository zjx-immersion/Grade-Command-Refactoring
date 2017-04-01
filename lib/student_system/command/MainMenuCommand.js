/**
 * Created by jxzhong on 4/1/17.
 */
const CloseCommand = require('./CloseCommand');
const RedirectStudentCommand = require('./RedirectStudentCommand')
const RedirectStudentReportCommand = require('./RedirectStudentReportCommand')

const INPUT_STUDENT = '1';
const INPUT_STUDENT_NUMBER = '2';
const CLOSE = '3';


class MainMenuCommand {
    constructor() {

    }

    exec(input) {
        let commandMap = [
            {status: INPUT_STUDENT, cmd: new RedirectStudentCommand()},
            {status: INPUT_STUDENT_NUMBER, cmd: new RedirectStudentReportCommand()},
            {status: CLOSE, cmd: new CloseCommand()}
        ]
        return commandMap.find(cmdObj => cmdObj.status == input).cmd.exec(input)
    }
}

module.exports = MainMenuCommand