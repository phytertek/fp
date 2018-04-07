const nativeArrayMethods = Object.getOwnPropertyNames(Array.prototype).reduce(
  (lambda, method) => {
    lambda[method] = ~[
      'concat',
      'every',
      'filter',
      'find',
      'findIndex',
      'includes',
      'join',
      'map',
      'reduce',
      'reduceRight',
      'slice',
      'some'
    ].indexOf(method)
      ? (fn, ...params) => arr => arr[method](fn, ...params)
      : ~['sort', 'copyWithin', 'fill'].indexOf(method)
        ? (...params) => arr => [...arr][method](...params)
        : ~['toLocaleString', 'indexOf', 'lastIndexOf'].indexOf(method)
          ? (...params) => arr => arr[method](...params)
          : ~['push', 'splice'].indexOf(method)
            ? (...params) => arr => {
                var t = [...arr];
                t[method](...params);
                return t;
              }
            : ~['toString', 'entries', 'keys'].indexOf(method)
              ? arr => arr[method]()
              : lambda[method];
    return lambda;
  },
  {}
);

const pop = (a = []) => a.slice(0, -1);

const shift = (a = []) => a.slice(1);

const unshift = e => (a = []) => [e, ...a];

const reverse = (a = []) => [...a].reverse();

const first = (a = []) => [...a].shift();

const last = (a = []) => [...a].pop();

const all = p => (a = []) => a.reduce((r, c) => (!r ? r : p(c)), true);

const any = p => (a = []) => a.reduce((r, c) => (r ? r : p(c)), false);

const append = e => (a = []) => [...a, e];

const prepend = shift;

const drop = (n = 0) => (a = []) => a.slice(n);

const dropLast = (n = 0) => (a = []) => a.slice(0, a.length - n);

const take = (n = 0) => (a = []) => a.slice(0, n);

const takeLast = (n = 0) => (a = []) => a.slice(a.length - n);

const flatten = (a = []) =>
  a.reduce(
    (r, c) => (Array.isArray(c) ? [...r, ...flatten(c)] : [...r, c]),
    []
  );

const insert = (i = 0) => e => (a = []) => [...a.slice(0, i), e, ...a.slice(i)];

const insertAll = (i = 0) => (e = []) => (a = []) => [
  ...a.slice(0, i),
  ...e,
  ...a.slice(i)
];

const update = (i = 0) => e => (a = []) => [
  ...a.slice(0, i),
  e,
  ...a.slice(i + 1)
];

module.exports = {
  ...nativeArrayMethods,
  pop,
  shift,
  unshift,
  reverse,
  first,
  last,
  all,
  any,
  drop,
  dropLast,
  take,
  takeLast,
  flatten,
  insert,
  insertAll,
  update
};
