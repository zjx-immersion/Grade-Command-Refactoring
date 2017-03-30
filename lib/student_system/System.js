'use strict';

const Subject = require('./Subject');
const Student = require('./Student');
const Class = require('./Class');

const ADD_STUDENT = 'ADD_STUDENT';
const QUERY_SCORE = 'QUERY_SCORE';
const CLOSED = 'CLOSED';
const COMMAND = 'COMMAND';
const INPUT_STUDENT = '1';
const INPUT_STUDENT_NUMBER = '2';
const CLOSE = '3';

class System {
  getStudentInfo(stuStr) {
    try {
      const resolveSubjectInput = (mathStr, chineseStr, englishStr, programStr) => {
        const getSubjectScore = (scoreStr) => {
          return parseFloat(scoreStr.split(':')[1]);
        };
        const math = getSubjectScore(mathStr);
        const chinese = getSubjectScore(chineseStr);
        const english = getSubjectScore(englishStr);
        const program = getSubjectScore(programStr);
        return new Subject(math, chinese, english, program);
      };
      const [name, stuNumStr, nation, classNumStr, mathStr, chineseStr, englishStr, programStr] = stuStr.split(',');
      const stuNumber = parseInt(stuNumStr);
      const classNum = parseInt(classNumStr);
      const subject = resolveSubjectInput(mathStr, chineseStr, englishStr, programStr);
      return new Student(name, stuNumber, nation, classNum, subject);
    } catch (e) {
      return null;
    }
  }
  constructor(readline) {
    this.classes = [];
    this.consoleState = COMMAND;
    this.readline = readline;
  }
  parseCommand(input) {
    if(input === INPUT_STUDENT) {
      this.consoleState = ADD_STUDENT;
    } else if(input === INPUT_STUDENT_NUMBER) {
      this.consoleState = QUERY_SCORE;
    } else if(input === CLOSE) {
      this.consoleState = CLOSED;
      this.readline.close();
    }
  }
  parseInput(input) {
    //todo  need to print msg
    if(this.consoleState === COMMAND) {
      this.parseCommand(input);
    } else if(this.consoleState === ADD_STUDENT) {
      const student = this.getStudentInfo(input);
      if(student) {
        this.updateClasses(student);
        this.consoleState = COMMAND;
      }
    } else if(this.consoleState === QUERY_SCORE) {
      const studentNumbers = this.parseStuNumInput(input);
      const classesInfo = this.getClassesInfo(studentNumbers);
      const scoresString = this.transScoreFormToString(classesInfo);
      console.log(scoresString);
      this.consoleState = COMMAND;
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
  parseStuNumInput(stuNumStr) {
    return stuNumStr.split(',').map(numStr => parseInt(numStr));
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
}

const resolveStudentInput = (stuStr) => {

};


module.exports = System;