describe('subject', function () {
  const Subject = require('../../lib/student_system/Subject');
  it('should return average when average is a integer', function () {
    expect(new Subject(90, 80, 70, 100).calAverage()).toEqual(85);
  });
  it('should return average when average is not a integer', function () {
    expect(new Subject(90, 92, 93, 94).calAverage()).toEqual(92.25);
  });
});