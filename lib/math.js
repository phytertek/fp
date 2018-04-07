const isNumber = v => typeof v === 'number';

const allNumbers = (...a) =>
  a.reduce((res, v) => (res ? isNumber(v) : res), true);

const orNaN = f => (a = 0) => (b = 0) => (allNumbers(a, b) ? f(a, b) : NaN);

const add = orNaN((a, b) => a + b);

const subtract = orNaN((a, b) => a - b);

const multiply = orNaN((a, b) => a * b);

const divide = orNaN((a, b) => a / b);

const modulo = orNaN((a, b) => a % b);

const increment = (a = 0) => add(a)(1);

const decrement = (a = a) => subtract(a)(1);

const sum = (arr = []) =>
  Array.isArray(arr) ? arr.reduce((acc, cv) => add(acc)(cv), 0) : NaN;

const mean = (arr = []) => divide(sum(arr))(arr.length);

const median = (arr = []) =>
  arr.length
    ? mean(
        arr
          .slice(0)
          .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
          .slice(
            (arr.length - (2 - arr.length % 2)) / 2,
            (arr.length - (2 - arr.length % 2)) / 2 + (2 - arr.length % 2)
          )
      )
    : 0;

const negate = (a = 0) => (isNumber(a) ? -a : NaN);

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  increment,
  decrement,
  sum,
  mean,
  median,
  negate
};
