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