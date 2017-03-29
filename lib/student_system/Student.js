'use strict';

class Student {
  constructor(name, stuNumber, nation, classNum, subject) {
    this.name = name;
    this.stuNumber = stuNumber;
    this.nation = nation;
    this.classNum = classNum;
    this.subject =subject;
  }
}

module.exports = Student;