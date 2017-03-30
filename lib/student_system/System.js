'use strict';

const Subject = require('./Subject');
const Student = require('./Student');
const Class = require('./Class');

const ADD_STUDENT = 'ADD_STUDENT';
const QUERY_SCORE = 'QUERY_SCORE';
const COMMAND = 'COMMAND';
const INPUT_STUDENT = '1';
const INPUT_STUDENT_NUMBER = '2';
const CLOSE = '3';

const WELCOME = `欢迎来到学生成绩控制台记录系统  Powered By Melo Gao`;
const COMMAND_MSG = `请输入命令:
1.添加学生
2.生成成绩单
3.退出`;
const ADD_STUDENT_MSG = '请输入学生信息:(姓名,学号,民族,班级,数学:成绩,语文:成绩,英语:成绩,编程:成绩)';
const QUERY_SCORE_MSG = '请输入要打印的学生学号:(学号,学号...)';
const GOODBYE = `see you`;

class System {

  constructor(readline) {
    this.classes = [];
    this.consoleState = COMMAND;
    this.readline = readline;
  }

  parseCommand(input) {
    if(input === INPUT_STUDENT) {
      this.consoleState = ADD_STUDENT;
      System.printAddStudent();
    } else if(input === INPUT_STUDENT_NUMBER) {
      this.consoleState = QUERY_SCORE;
      System.printQueryScore();
    } else if(input === CLOSE) {
      System.printGoodBye();
      this.readline.close();
    } else {
      System.printCommand();
    }
  }

  parseInput(input) {
    if(this.consoleState === COMMAND) {
      this.parseCommand(input);
    } else if(this.consoleState === ADD_STUDENT) {
      this.addStudent(input);
    } else if(this.consoleState === QUERY_SCORE) {
      this.queryScores(input);
    }
  }

  queryScores(studentNumbersStr) {
    const studentNumbers = studentNumbersStr.split(',');
    const classesInfo = this.getClassesInfo(studentNumbers);
    const scoresString = this.transScoreFormToString(classesInfo);
    console.log(scoresString);
    this.consoleState = COMMAND;
    System.printCommand();
  }

  addStudent(studentStr) {
    const student = this.getStudentInfo(studentStr);
    if (student) {
      this.updateClasses(student);
      this.consoleState = COMMAND;
      System.printCommand();
    } else {
      System.printAddStudent('请按正确的格式输入, ');
    }
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
    let resultClasses = [];
    for (let stuNumber of stuNumbers) {
      for (let clazzInSystem of this.classes) {
        const student = clazzInSystem.students.find(student => student.stuNumber === stuNumber);
        if (student) {
          let addClazz = resultClasses.find(clazz => clazz.classNumber === student.classNumber);
          if (addClazz) {
            addClazz.addStudent(student);
          } else {
            const exitClazz = this.classes.find(clazz => student.classNumber === clazz.classNumber);
            let clazz = new Class(student.classNumber);
            clazz.addStudent(student);
            clazz.median = exitClazz.median;
            clazz.average = exitClazz.average;
            resultClasses.push(clazz);
          }
        }
      }
    }
    return resultClasses;
  }

  transScoreFormToString(classes) {
    let resultString = ``;
    classes.forEach(clazz => {
      resultString += `成绩单
姓名|数学|语文|英语|编程|平均分|总分
==================\n`;
      clazz.students.forEach(student => {
        const subject = student.subject;
        resultString += `${student.name}|${subject.math}|${subject.chinese}|${subject.english}|${subject.program}|${student.average}|${student.total}\n`;
      });
      resultString += `==================
全班总成绩平均分:${clazz.average}
全班总成绩中位数:${clazz.median}\n`;
    });
    return resultString;
  }

  static printWELCOME() {
    console.log(WELCOME);
  }

  static printCommand() {
    console.log(COMMAND_MSG);
  }

  static printAddStudent(error_msg) {
    if(error_msg) {
      console.log(error_msg + ADD_STUDENT_MSG);
    } else {
      console.log(ADD_STUDENT_MSG);
    }
  }

  static printQueryScore() {
    console.log(QUERY_SCORE_MSG)
  }

  static printGoodBye() {
    console.log(GOODBYE)
  }
}

module.exports = System;
