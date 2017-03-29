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
    const student = new Student('Melo', 24, 'Han', 1, subject);
    let classNumber = 1;
    let expectClass = new Class(classNumber);
    expectClass.addStudent(student);
    expect(system.updateClasses(student)).toEqual([expectClass]);
  });

  it('should set console state to input student after input command 1', function () {
    let input = '1';
    system.parseCommand(input);
    expect(system.consoleState).toEqual('INPUT_STUDENT');
  });
});