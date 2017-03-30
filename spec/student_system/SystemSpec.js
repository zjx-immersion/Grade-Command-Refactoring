describe('system', function () {
  const System = require('../../lib/student_system/System');
  const Student = require('../../lib/student_system/Student');
  const Subject = require('../../lib/student_system/Subject');
  const Class = require('../../lib/student_system/Class');
  let system;

  beforeEach(function () {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    system = new System(rl);
  });

  it('should return student info when given an input string of student', function () {
    const inputStr = 'Melo,24,Han,1,math:90,chinese:80,english:70,program:100';
    const subject = new Subject(90, 80, 70, 100);
    const expectStudent = new Student('Melo', 24, 'Han', 1, subject);
    expect(System.getStudentInfo(inputStr)).toEqual(expectStudent);
  });

  it('should return updated classes when given a new student', function () {
    const subject = new Subject(90, 80, 70, 100);
    let classNumber = 1;
    const student = new Student('Melo', 24, 'Han', classNumber, subject);
    let expectClass = new Class(classNumber);
    expectClass.addStudentAndUpdateScores(student);
    expect(system.updateClasses(student)).toEqual([expectClass]);
  });

  it('should set console state to input student after input command 1', function () {
    const input = '1';
    system.parseInput(input);
    expect(system.consoleState).toEqual('ADD_STUDENT');
  });

  it('should set console state to query scores after input command 2', function () {
    const input = '2';
    system.parseInput(input);
    expect(system.consoleState).toEqual('QUERY_SCORE');
  });

  it('should set console state to closed after input command 3', function () {
    const input = '3';
    system.parseInput(input);
    expect(system.consoleState).toEqual('CLOSED');
  });

  it('should add student into classes and set console state when given a studentStr input', function () {
    const input = 'Melo,24,Han,1,math:90,chinese:80,english:70,program:100';
    const subject = new Subject(90, 80, 70, 100);
    let classNumber = 1;
    const student = new Student('Melo', 24, 'Han', classNumber, subject);
    const expectClass = new Class(classNumber);
    expectClass.addStudentAndUpdateScores(student);
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

  it('should return classes has one class only with student which number in input', function () {
    const student1 = new Student('Melo', 8, 'han', 1, new Subject(90, 80, 80, 90));
    const student2 = new Student('Kobe', 24, 'han', 1, new Subject(100, 100, 100, 100));
    const student3 = new Student('James', 23, 'han', 1, new Subject(98, 98, 98, 98));
    system.updateClasses(student1);
    system.updateClasses(student2);
    system.updateClasses(student3);
    const stuNumbers = [8, 24];
    const expectClass = new Class(1);
    expectClass.addStudent(student1);
    expectClass.addStudent(student2);
    expectClass.median = 392;
    expectClass.average = 377.33;
    expect(system.getClassesInfo(stuNumbers)).toEqual([expectClass]);
  });

  it('should retrun classes when given studnet not in one class', function () {
    const student1 = new Student('Melo', 8, 'han', 1, new Subject(90, 80, 80, 90));
    const student2 = new Student('Kobe', 24, 'han', 1, new Subject(100, 100, 100, 100));
    const student3 = new Student('James', 23, 'han', 2, new Subject(98, 98, 98, 98));
    system.updateClasses(student1);
    system.updateClasses(student2);
    system.updateClasses(student3);
    const stuNumbers = [23, 24];
    const expectClass1 = new Class(1);
    const expectClass2 = new Class(2);
    expectClass1.addStudent(student2);
    expectClass2.addStudent(student3);
    expectClass1.median = 370;
    expectClass1.average = 370;
    expectClass2.median= 392;
    expectClass2.average = 392;
    expect(system.getClassesInfo(stuNumbers)).toEqual([expectClass2, expectClass1]);
  });

  it('should return score form string when given one class', function () {
    const student = new Student('Melo', 8, 'han', 1, new Subject(90, 80, 80, 90));
    const inputClass = new Class(1);
    inputClass.addStudentAndUpdateScores(student);
    const expectStr = `成绩单
姓名|数学|语文|英语|编程|平均分|总分
==================
Melo|90|80|80|90|85|340
==================
全班总成绩平均分:340
全班总成绩中位数:340\n`;
    expect(system.transScoreFormToString([inputClass])).toEqual(expectStr);
  });

  it('should return score form string when given two classes', function () {
    const student1 = new Student('Melo', 8, 'han', 1, new Subject(90, 80, 80, 90));
    const student2 = new Student('Kobe', 24, 'han', 2, new Subject(90, 80, 80, 90));
    system.updateClasses(student1);
    system.updateClasses(student2);
    const inputClass1 = new Class(1);
    const inputClass2 = new Class(2);
    inputClass1.addStudentAndUpdateScores(student1);
    inputClass2.addStudentAndUpdateScores(student2);
    const expectStr = `成绩单
姓名|数学|语文|英语|编程|平均分|总分
==================
Melo|90|80|80|90|85|340
==================
全班总成绩平均分:340
全班总成绩中位数:340
成绩单
姓名|数学|语文|英语|编程|平均分|总分
==================
Kobe|90|80|80|90|85|340
==================
全班总成绩平均分:340
全班总成绩中位数:340\n`;
    expect(system.transScoreFormToString([inputClass1, inputClass2])).toEqual(expectStr);
  });

  it('should add student and set console state to command when input student', function () {
    system.consoleState = 'ADD_STUDENT';
    system.parseInput('Melo,8,han,1,math:90,chinese:80,english:80,program:90');
    const expectStudent = new Student('Melo', 8, 'han', 1, new Subject(90, 80, 80, 90));
    expect(system.classes[0].students[0]).toEqual(expectStudent);
  });

  it('should console log score and set console state to command when input student number', function () {
    system.consoleState = 'QUERY_SCORE';
    system.updateClasses(new Student('Melo', 8, 'han', 1, new Subject(90, 80, 80, 90)));
    spyOn(console, 'log');
    system.parseInput('8');
    const expectStr = `成绩单
姓名|数学|语文|英语|编程|平均分|总分
==================
Melo|90|80|80|90|85|340
==================
全班总成绩平均分:340
全班总成绩中位数:340\n`;
    expect(console.log).toHaveBeenCalledWith(expectStr);
    expect(system.consoleState).toEqual('COMMAND');
  });
});