const curry = (fn, ...args) =>
  fn.length <= args.length
    ? fn(...args)
    : (...otherArgs) => c(fn, ...args, ...otherArgs);

const cp = method => (...fns) => initialValue =>
  fns[method]((value, fn) => fn(value), initialValue);

const compose = cp('reduceRight');

const pipe = cp('reduce');

const identity = a => a;

module.exports = {
  curry,
  compose,
  pipe,
  identity
};
