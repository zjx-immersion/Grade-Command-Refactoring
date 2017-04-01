/**
 * Created by jxzhong on 3/31/17.
 */
const ADD_STUDENT = 'ADD_STUDENT'
const ADD_STUDENT_MSG = '请输入学生信息:(姓名,学号,民族,班级,数学:成绩,语文:成绩,英语:成绩,编程:成绩)'
class DisplayStudentReportViewCommand {

    constructor() {

    }

    exec() {
        return {msg: ADD_STUDENT_MSG, status: ADD_STUDENT}
    }
}

module.exports = DisplayStudentReportViewCommand