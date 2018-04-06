const array = require('./array');

describe('Array Methods', () => {
  describe('last', () => {
    test('should return last element in array', () => {
      expect(array.last([1, 2, 3, 4, 5])).toBe(5);
    });
  });
});
