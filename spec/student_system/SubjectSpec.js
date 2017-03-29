describe('subject', function () {
  const Subject = require('../../lib/student_system/Subject');
  it('should return average when invoke subject.calAverage', function () {
    expect(new Subject(90, 80, 70, 100).calAverage()).toEqual(85);
  });
});