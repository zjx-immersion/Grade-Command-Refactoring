describe('class', function () {
  const Class = require('../../lib/student_system/Class');
  const Student = require('../../lib/student_system/Student');
  const Subject = require('../../lib/student_system/Subject');
  it('should add student success when given a student', function () {
    const student1 = new Student('melo', 15, 'Han', 1, new Subject(90, 90, 90, 90));
    const studnet2 = new Student('kobe', 24, 'Han', 1, new Subject(100, 100, 100, 100));
    const student3 = new Student('james', 23, 'Han', 1, new Subject(96, 96, 96, 96));
    let clazz = new Class(1);
    clazz.addStudent(student1);
    expect(clazz.average).toEqual(360);
    expect(clazz.median).toEqual(360);
    clazz.addStudent(studnet2);
    expect(clazz.average).toEqual(380);
    expect(clazz.median).toEqual(380);
    clazz.addStudent(student3);
    expect(clazz.average).toEqual(381.33);
    expect(clazz.median).toEqual(384);
  });
});