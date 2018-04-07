const logic = require('../lib/logic');

describe('Logic Methods', () => {});

describe('and', () => {
  test('returns true if both provided argumens are true', () =>
    expect(logic.and(true)(true)).toBeTruthy());
  test('returns false if one or more of the arguments provided is false', () =>
    expect(logic.and(true)(false)).toBeFalsy());
});
