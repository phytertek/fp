const object = require('../lib/object');
describe('Object Methods', () => {
  describe('assoc', () => {
    test('should add supplied key and value args as key/val pair in supplied object', () => {
      const test = object.assoc('a')('test')({});
      expect(test).toHaveProperty('a');
      expect(test.a).toBe('test');
    });
    test('should create new object if one is not supplied', () => {
      const test = object.assoc(1)(0)();
      expect(test['1']).toBe(0);
    });
    test('should return a shallow clone if no changes are made', () => {
      const original = { a: 1 };
      const assoc = object.assoc('a')(1)(original);
      expect(assoc).not.toBe(original);
    });
  });

  describe('dissoc', () => {
    test('should remove the given key from the object', () => {
      const original = { a: 1, b: 2 };
      const dissoc = object.dissoc('a')(original);
      expect(dissoc).not.toEqual(original);
      expect(dissoc).toEqual({ b: 2 });
    });
  });

  describe('clone', () => {
    test('should handle null, undefined, NaN values', () => {
      expect(object.deepClone(null)).toBeNull();
      expect(object.deepClone(undefined)).toBeUndefined();
      expect(object.deepClone(NaN)).toBeNaN();
    });
    test('should return value of same type supplied', () => {
      expect(Array.isArray(object.deepClone([]))).toBeTruthy();
      expect(typeof object.deepClone('')).toBe('string');
      expect(typeof object.deepClone({})).toBe('object');
      expect(typeof object.deepClone(() => null)).toBe('function');
    });
    test('should handle deep clone of nested object', () => {
      const original = { a: { b: { c: 1 } } };
      const clone = object.deepClone(original);
      expect(clone).toEqual(original);
      expect(clone.a.b).not.toBe(original.a.b);
    });
    test('should handle deep clone of nested arrays', () => {
      const original = [[['a', ['b']]]];
      const clone = object.deepClone(original);
      expect(clone).toEqual(original);
      expect(clone[0][0][1]).not.toBe(original[0][0][1]);
    });
  });

  describe('eqProps', () => {
    test('should evaluate whether specified prop is equal on given objects', () => {
      const o1 = { a: 1, b: 2 };
      const o2 = { a: 1, b: 0 };
      expect(object.eqProps('a')(o1)(o2)).toBeTruthy();
      expect(object.eqProps('b')(o1)(o2)).toBeFalsy();
    });
    test('should handle non existant key', () => {
      expect(object.eqProps('a')({ b: 1 })({ b: 1 })).toBeTruthy();
      expect(object.eqProps('a')({ b: 1 })({ a: 1, b: 1 })).toBeFalsy();
    });
  });

  describe('has', () => {
    test('should evaluate whether the given object has the specified property', () => {
      expect(object.has('a')({ a: 1 })).toBeTruthy();
      expect(object.has('b')({ a: 1 })).toBeFalsy();
    });
  });

  describe('invert', () => {
    test('should invert values to keys and return keys in array', () => {
      expect(object.invert({ a: 1, b: 2 })['1']).toEqual(['a']);
    });

    test('should handle duplicate values by appending all keys to array on value property', () => {
      expect(object.invert({ a: 1, b: 1, c: 1 })['1']).toEqual(['a', 'b', 'c']);
    });
  });

  describe('evolve', () => {
    test('should return shallow clone if no functions provided', () => {
      expect(object.evolve()({ a: 1, b: 2 })).toEqual({ a: 1, b: 2 });
    });
    test('should evolve properties by specified functions', () => {
      expect(object.evolve({ a: v => v + 1 })({ a: 2 })).toEqual({ a: 3 });
    });
  });

  describe('omit', () => {
    test('should return clone of given object without the given enumerated properties', () => {
      const original = { a: 1, b: 2, c: 3 };
      const omit = object.omit(['a', 'b'])(original);
      expect(omit).toEqual({ c: 3 });
    });
  });

  describe('path', () => {
    test('should return the value located at the property path specified in the given array from the specified object', () => {
      const p = ['a', 'b', 'c', 'd'];
      const obj = { a: { b: { c: { d: 'yo' } } } };
      expect(object.path(p)(obj)).toBe('yo');
    });
    test('should return undefined if invalid path', () => {
      const p = ['a', 'b', 'c', 'd'];
      const obj = { z: { y: { x: { w: 'dude' } } } };
      expect(object.path(p)(obj)).toBeUndefined();
    });
  });

  describe('pick', () => {
    test('should return an object with the given properties from the specified object', () => {
      const p = ['a', 'b', 'c'];
      const obj = { a: 1, b: 2, c: 3, d: 'secret' };
      expect(object.pick(p)(obj)).toEqual({ a: 1, b: 2, c: 3 });
    });
    test("should ignore properties that don't exist", () => {
      const p = ['x', 'y', 'z'];
      const obj = { y: 1, z: 2, a: 'secret' };
      expect(object.pick(p)(obj)).toEqual({ y: 1, z: 2 });
    });
  });

  describe('keys', () => {
    test('should return an array of all property names in a given object', () =>
      expect(object.keys({ a: 1, b: 2, c: 3 })).toEqual(['a', 'b', 'c']));
  });

  describe('values', () => {
    test('should return an array of values for all properties in a given object', () => {
      expect(object.values({ a: 1, b: 2, c: 3 })).toEqual([1, 2, 3]);
    });
  });
});
