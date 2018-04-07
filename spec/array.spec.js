const array = require('../lib/array');

describe('Array Methods', () => {
  describe('last', () => {
    test('should return last element in array', () => {
      expect(array.last([1, 2, 3, 4, 5])).toBe(5);
    });
  });

  describe('all', () => {
    test('should return true if the supplied predicate resolves to true on all elements in the given array', () => {
      expect(array.all(v => v)([true, true, true])).toBeTruthy();
    });
    test('should return false if any elements resolve to false', () => {
      expect(array.all(v => v)([true, true, false])).toBeFalsy();
    });
  });

  describe('any', () => {
    test('should return true if the supplied predicate resolves to true on any of the elements in the given array', () => {
      expect(array.any(v => v)([false, true, false])).toBeTruthy();
    });
    test('should return false if all elements resolve to false', () => {
      expect(array.all(v => v)([false, false, false])).toBeFalsy();
    });
  });

  describe('drop', () => {
    test('should return a new array, elements starting from the nth index from the given argument', () => {
      expect(array.drop(3)([1, 2, 3, 4])).toEqual([4]);
    });
  });

  describe('dropLast', () => {
    test('should return a new array, removing elements starting from the nth index from the given argument', () => {
      expect(array.dropLast(3)([1, 2, 3, 4])).toEqual([1]);
    });
  });

  describe('take', () => {
    test('should return a new array, elements ending at the nth index from the given argument', () => {
      expect(array.take(3)([1, 2, 3, 4])).toEqual([1, 2, 3]);
    });
  });

  describe('takeLast', () => {
    test('should return a new array from the elements starting at the array length minus the given number of elements requested', () => {
      expect(array.takeLast(3)([1, 2, 3, 4])).toEqual([2, 3, 4]);
    });
  });

  describe('flatten', () => {
    test('should return new flattened array', () => {
      expect(array.flatten([1, [2, [3, [4, [5]], 6]], 7])).toEqual([
        1,
        2,
        3,
        4,
        5,
        6,
        7
      ]);
    });
  });

  describe('insert', () => {
    test('should add a given element at the given index in the specified array', () => {
      expect(array.insert(2)('Hello')([1, 2, 3, 4, 5])).toEqual([
        1,
        2,
        'Hello',
        3,
        4,
        5
      ]);
    });
    test('should append element if given index gt array length', () => {
      expect(array.insert(100)('a')([0, 1])).toEqual([0, 1, 'a']);
    });
  });

  describe('insertAll', () => {
    test('should insert the given elements at the given index in the specified array', () => {
      expect(array.insertAll(1)(['a', 'b'])([1, 2, 3, 4])).toEqual([
        1,
        'a',
        'b',
        2,
        3,
        4
      ]);
    });
  });

  describe('update', () => {
    test('should replace the element at the given index with the given element in the specified array', () =>
      expect(array.update(1)('b')([1, 2, 3])).toEqual([1, 'b', 3]));
  });
});
