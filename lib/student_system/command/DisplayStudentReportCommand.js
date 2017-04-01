/**
 * Created by jxzhong on 3/31/17.
 */
const QUERY_SCORE_MSG = '请输入要打印的学生学号:(学号,学号...)'
const QUERY_SCORE = 'QUERY_SCORE'
class DisplayStudentReportCommand {
    constructor() {

    }

    exec() {
        return {msg: QUERY_SCORE_MSG, status: QUERY_SCORE}
    }
}

module.exports = DisplayStudentReportCommand