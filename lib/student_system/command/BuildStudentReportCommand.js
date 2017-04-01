/**
 * Created by jxzhong on 3/31/17.
 */
const StudentSystemService = require('../StudentSystemService')
const COMMAND = 'COMMAND';

const COMMAND_MSG = `请输入命令:
1.添加学生
2.生成成绩单
3.退出`;
class BuildStudentReportCommand {
    constructor(studentSystemService) {
        this.studentSystemService = studentSystemService
    }

    exec(studentNumbersStr) {
        const studentNumbers = studentNumbersStr.split(',');
        const classesInfo = this.studentSystemService.getClassesInfo(studentNumbers);
        const scoresString = this.studentSystemService.transScoreFormToString(classesInfo);
        return {msg: scoresString + "\r\n" + COMMAND_MSG, status: COMMAND}
    }

}

module.exports = BuildStudentReportCommand