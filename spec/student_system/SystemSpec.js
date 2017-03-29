describe('system', function () {
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
});