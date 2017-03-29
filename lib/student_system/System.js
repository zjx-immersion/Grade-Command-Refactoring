'use strict';

const Subject = require('./Subject');
const Student = require('./Student');

class System {
  getStudentInfo(stuStr) {
    let student = resolveStudentInput(stuStr);
    return student;
  }
}

const resolveStudentInput = (stuStr) => {
  const [name, stuNumStr, nation, classNumStr, mathStr, chineseStr, englishStr, programStr] = stuStr.split(',');
  const stuNumber = parseInt(stuNumStr);
  const classNum = parseInt(classNumStr);
  const subject = resolveSubjectInput(mathStr, chineseStr, englishStr, programStr);
  return new Student(name, stuNumber, nation, classNum, subject);
};

const resolveSubjectInput = (mathStr, chineseStr, englishStr, programStr) => {
  const math = mathStr.split(':')[0];
  const chinese = chineseStr.split(':')[0];
  const english = englishStr.split(':')[0];
  const program = programStr.split(':')[0];
  return new Subject(math, chinese, english, program);
};

module.exports = System;