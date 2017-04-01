/**
 * Created by jxzhong on 3/31/17.
 */
const Subject = require('./Subject');
const Student = require('./Student');
const Class = require('./Class');

const ADD_STUDENT = 'ADD_STUDENT';
const QUERY_SCORE = 'QUERY_SCORE';
const TERMINATE = 'TERMINATE';
const COMMAND = 'MENU_COMMAND';

const COMMAND_MSG = `请输入命令:
1.添加学生
2.生成成绩单
3.退出`;
const ADD_STUDENT_MSG = '请输入学生信息:(姓名,学号,民族,班级,数学:成绩,语文:成绩,英语:成绩,编程:成绩)';
const classesDB = []

class StudentSystemService {
    constructor() {
        this.classes = classesDB;
    }

    getStudentInfo(stuStr) {
        try {
            const createSubject = (mathStr, chineseStr, englishStr, programStr) => {
                const getSubjectScore = (scoreStr) => {
                    return parseFloat(scoreStr.split(':')[1]);
                };
                const math = getSubjectScore(mathStr);
                const chinese = getSubjectScore(chineseStr);
                const english = getSubjectScore(englishStr);
                const program = getSubjectScore(programStr);
                return new Subject(math, chinese, english, program);
            };
            const [name, stuNumber, nation, classNum, mathStr, chineseStr, englishStr, programStr] = stuStr.split(',');
            const subject = createSubject(mathStr, chineseStr, englishStr, programStr);
            return new Student(name, stuNumber, nation, classNum, subject);
        } catch (e) {
            return null;
        }
    }

    updateClasses(student) {
        let exitedClazz = this.classes.find(clazz => clazz.classNumber === student.classNumber);
        if (exitedClazz) {
            exitedClazz.addStudentAndUpdateScores(student);
        } else {
            let clazz = new Class(student.classNumber);
            clazz.addStudentAndUpdateScores(student);
            this.classes.push(clazz);
        }
        return this.classes;
    }

    getClassesInfo(stuNumbers) {
        return this.classes
            .map(clazzInSystem => {
                const students = clazzInSystem.students.filter(student => stuNumbers.indexOf(student.stuNumber) !== -1);
                if (!students) return null;
                return this.createQueryClass(clazzInSystem, students);
            })
            .filter(queryClazz => queryClazz);
    }

    createQueryClass(clazzInSystem, students) {
        let resultClass = new Class(clazzInSystem.classNumber);
        students.forEach(student => resultClass.addStudent(student));
        resultClass.median = clazzInSystem.median;
        resultClass.average = clazzInSystem.average;
        return resultClass;
    }

    transScoreFormToString(classes) {
        let resultString = ``;
        classes.forEach(clazz => {
            resultString += `成绩单
姓名|数学|语文|英语|编程|平均分|总分
==================\r\n`;
            clazz.students.forEach(student => {
                const subject = student.subject;
                resultString += `${student.name}|${subject.math}|${subject.chinese}|${subject.english}|${subject.program}|${student.average}|${student.total}\r\n`;
            });
            resultString += `==================
全班总成绩平均分:${clazz.average}
全班总成绩中位数:${clazz.median}\r\n`;
        });
        return resultString;
    }
}

module.exports = StudentSystemService