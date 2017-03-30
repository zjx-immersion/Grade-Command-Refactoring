describe('system', function () {
  const System = require('../../lib/student_system/System');
  const Student = require('../../lib/student_system/Student');
  const Subject = require('../../lib/student_system/Subject');
  const Class = require('../../lib/student_system/Class');
  let system;

  beforeEach(function () {
    system = new System();
  });

  it('should return student info when given an input string of student', function () {
    const inputStr = 'Melo,24,Han,1,math:90,chinese:80,english:70,program:100';
    const subject = new Subject(90, 80, 70, 100);
    const expectStudent = new Student('Melo', 24, 'Han', 1, subject);
    expect(system.getStudentInfo(inputStr)).toEqual(expectStudent);
  });

  it('should return updated classes when given a new student', function () {
    const subject = new Subject(90, 80, 70, 100);
    let classNumber = 1;
    const student = new Student('Melo', 24, 'Han', classNumber, subject);
    let expectClass = new Class(classNumber);
    expectClass.addStudent(student);
    expect(system.updateClasses(student)).toEqual([expectClass]);
  });

  it('should set console state to input student after input command 1', function () {
    let input = '1';
    system.parseInput(input);
    expect(system.consoleState).toEqual('ADD_STUDENT');
  });

  it('should add student into classes and set console state when given a studentStr input', function () {
    const input = 'Melo,24,Han,1,math:90,chinese:80,english:70,program:100';
    const subject = new Subject(90, 80, 70, 100);
    let classNumber = 1;
    const student = new Student('Melo', 24, 'Han', classNumber, subject);
    const expectClass = new Class(classNumber);
    expectClass.addStudent(student);
    system.consoleState = 'ADD_STUDENT';
    system.parseInput(input);
    expect(system.classes).toEqual([expectClass]);
    expect(system.consoleState).toEqual('COMMAND');
  });

  it('should return stuNumbers when given input string of student numbers', function () {
    const stuNumStr = '1,2,3';
    const expectStuNumbers = [1, 2, 3];
    expect(system.parseStuNumInput(stuNumStr)).toEqual(expectStuNumbers);
  });

  it('should return NaN when given input string has something is not a number', function () {
    const input = 'a';
    expect(system.parseStuNumInput(input)).toEqual([NaN]);
  });
});