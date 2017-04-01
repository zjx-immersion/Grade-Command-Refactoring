/**
 * Created by jxzhong on 3/31/17.
 */
const StudentSystemService = require('../StudentSystemService')
const RedirectMainCommand = require('./DisplayMainViewCommand')

const COMMAND = 'MENU_COMMAND_EXEC'

const ADD_STUDENT = 'ADD_STUDENT'
const ADD_STUDENT_MSG = '请输入学生信息:(姓名,学号,民族,班级,数学:成绩,语文:成绩,英语:成绩,编程:成绩)'

class AddStudentCommand {
    constructor(studentSystemService) {
        this.studentSystemService = new StudentSystemService()
    }

    exec(studentStr) {
        const student = this.studentSystemService.getStudentInfo(studentStr);
        if (student) {
            this.studentSystemService.updateClasses(student);
            return new RedirectMainCommand().exec()
        } else {
            return {msg: '请按正确的格式输入, ' + ADD_STUDENT_MSG, status: ADD_STUDENT};
        }
    }

}

module.exports = AddStudentCommand
