const math = require('../lib/math');

describe('Math Methods', () => {
  describe('add', () => {
    test('should return sum of two given arguments', () => {
      expect(math.add(1)(2)).toBe(3);
    });
    test('should return NaN if any arguments are not numbers', () => {
      expect(math.add('boop')(3)).toBeNaN();
    });
  });

  describe('subtract', () => {
    test('should return difference of two given arguments', () =>
      expect(math.subtract(2)(1)).toBe(1));
    test('should return NaN if any arguments are not numbers', () =>
      expect(math.subtract('blip')(2)).toBeNaN());
  });

  describe('multiply', () => {
    test('should return product of two given arguments', () =>
      expect(math.multiply(2)(2)).toBe(4));
    test('should return NaN if either argument is not a number', () =>
      expect(math.multiply('foo')(2)).toBeNaN());
  });

  describe('divide', () => {
    test('should retrun quotient two given arguments', () =>
      expect(math.divide(4)(2)).toBe(2));
    test('should return NaN if either argument is not a number', () =>
      expect(math.divide('foo')(2)).toBeNaN());
  });

  describe('modulo', () => {
    test('should return remainder of two given arguments', () =>
      expect(math.modulo(5)(3)).toBe(2));
    test('should return NaN if either argument is not a number', () =>
      expect(math.modulo('foo')(2)).toBeNaN());
  });

  describe('increment', () => {
    test('should return the sum of adding one to the given argument', () =>
      expect(math.increment(1)).toBe(2));
  });
  describe('decrement', () => {
    test('should return the difference of subtracting from to the given argument', () =>
      expect(math.decrement(2)).toBe(1));
  });

  describe('negate', () => {
    test('should return negative value of given argument', () =>
      expect(math.negate(2)).toBe(-2));
    test('should return NaN if given argument is not a number', () =>
      expect(math.negate('boo')).toBeNaN());
  });

  describe('sum', () => {
    test('should return sum of all elements in given argument', () =>
      expect(math.sum([1, 2, 3])).toBe(6));
    test('should return NaN if the given argument is not an array of numbers', () => {
      expect(math.sum('bee')).toBeNaN();
      expect(math.sum([1, 2, 'baa'])).toBeNaN();
    });
  });

  describe('mean', () => {
    test('should return the mean of all elements in the given argument', () =>
      expect(math.mean([1, 2, 3, 4, 5])).toBe(3));
  });

  describe('median', () => {
    test('should return the median of all the elements in the given argument', () =>
      expect(math.median([1, 2, 3, 4, 5, 6, 5, 7, 8, 9, 10])).toBe(5));
  });
});
