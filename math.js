const add = (a = 0) => (b = 0) => a + b;
const subtract = (a = 0) => (b = 0) => a - b;
const multiply = (a = 0) => (b = 0) => a * b;
const divide = (a = 0) => (b = 0) => a / b;
const modulo = (a = 0) => (b = 0) => a % b;
const increment = (a = 0) => add(a)(1);
const decrement = (a = 0) => subtract(a)(1);
const sum = (arr = []) => arr.reduce((acc, cv) => add(acc)(cv));
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
const negate = (a = 0) => -a;

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
