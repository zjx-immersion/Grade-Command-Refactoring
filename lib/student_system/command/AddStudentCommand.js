/**
 * Created by jxzhong on 3/31/17.
 */
const StudentSystemService = require('../StudentSystemService')
const COMMAND_MSG = `请输入命令:
1.添加学生
2.生成成绩单
3.退出`
const COMMAND = 'COMMAND'

const ADD_STUDENT = 'ADD_STUDENT'
const ADD_STUDENT_MSG = '请输入学生信息:(姓名,学号,民族,班级,数学:成绩,语文:成绩,英语:成绩,编程:成绩)'

class AddStudentCommand {
    constructor(studentSystemService) {
        this.studentSystemService = studentSystemService
    }

    exec(studentStr) {
        const student = this.studentSystemService.getStudentInfo(studentStr);
        if (student) {
            this.studentSystemService.updateClasses(student);
            return {msg: COMMAND_MSG, status: COMMAND};
        } else {
            return {msg: '请按正确的格式输入, ' + ADD_STUDENT_MSG, status: ADD_STUDENT};
        }
    }

}

module.exports = AddStudentCommand
