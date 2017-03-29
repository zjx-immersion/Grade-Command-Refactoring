'use strict';

class Class {
  constructor(classNumber) {
    this.classNumber = classNumber;
    this.students = [];
    this.average = 0;
    this.median = 0;
  }
  addStudent(student) {
    this.students.push(student);
    this.average = parseFloat(this.students.reduce((total, nextStu) => total + nextStu.total)) / this.students.length;
    const sortedStudent = this.students.sort((stu1, stu2) => stu1.total - stu2.total);
    let studentsLenth = sortedStudent.length;
    if (studentsLenth % 2 === 0) {
      this.median = parseFloat(sortedStudent[studentsLenth / 2].total + sortedStudent[studentsLenth / 2 - 1].total) / 2;
    } else {
      this.median = sortedStudent[parseInt(studentsLenth / 2)].total;
    }
  }
}