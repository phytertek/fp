const func = require('../lib/function');

describe('Function Methods', () => {
  describe('of', () => {
    test('should return array of given arguments', () =>
      expect(func.of(1, 2, 3)).toEqual([1, 2, 3]));
  });

  describe('once', () => {
    test('should return memoized copy of given function', () => {
      const memoized = func.once((a, b) => a + b);
      const firstRun = memoized(5, 6);
      const secondRun = memoized(3, 4);
      expect(typeof memoized).toBe('function');
      expect(firstRun).toEqual(secondRun);
    });
  });

  describe('always', () => {
    test('should return a function that always returns the given value', () => {
      const always = func.always(42);
      expect(typeof always).toBe('function');
      expect(always()).toBe(42);
    });
  });

  describe('either', () => {
    test('should return function', () => {
      expect(typeof func.either(v => v)(v => v)).toBe('function');
    });
    test('returns the result of the first function if it is truthy', () => {
      expect(func.either(() => true)(() => false)()).toBe(true);
    });
    test('returns the result of the second function if the first returns falsy', () => {
      expect(func.either(() => false)(() => 'Boom')()).toBe('Boom');
    });
  });
});
