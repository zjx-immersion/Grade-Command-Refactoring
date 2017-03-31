/**
 * Created by jxzhong on 3/31/17.
 */
const StudentSystemService = require('../StudentSystemService')

class BuildStudentReportCommand {
    constructor(studentSystemService) {
        this.studentSystemService = studentSystemService
    }

    exec(studentNum) {
        return this.studentSystemService.queryScores(studentNum)
    }

}

module.exports = BuildStudentReportCommand