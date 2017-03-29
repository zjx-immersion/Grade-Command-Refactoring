'use strict';

const Subject = require('./Subject');
const Student = require('./Student');
const Class = require('./Class');

const ADD_STUDENT = 'ADD_STUDENT';
const COMMAND = 'COMMAND';
const INPUT_STUDENT = '1';

class System {
  constructor() {
    this.classes = [];
    this.consoleState = COMMAND;
  }
  parseInput(input) {
    const parseCommand = (input) => {
      if(input === INPUT_STUDENT) {
        this.consoleState = ADD_STUDENT;
      }
    };
    if(this.consoleState === COMMAND) {
      parseCommand(input);
    } else if(this.consoleState === ADD_STUDENT) {
      const student = this.getStudentInfo(input);
      this.updateClasses(student);
      this.consoleState = COMMAND;
    }
  }
  getStudentInfo(stuStr) {
    return resolveStudentInput(stuStr);
  }
  updateClasses(student) {
    let isInclude = false;
    for (let clazz of this.classes) {
      if (clazz.classNum === student.classNum) {
        clazz.addStudent(student);
        isInclude = true;
        break;
      }
    }
    if (!isInclude) {
      let clazz = new Class(student.classNum);
      clazz.addStudent(student);
      this.classes.push(clazz);
    }
    return this.classes;
  }
}

const resolveStudentInput = (stuStr) => {
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
};


module.exports = System;