const nam = [
  [
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
  ],
  ['sort', 'copyWithin', 'fill'],
  ['toLocaleString', 'indexOf', 'lastIndexOf'],
  ['push', 'splice'],
  ['toString', 'entries', 'keys']
];

const nativeArrayMethods = Object.getOwnPropertyNames(Array.prototype).reduce(
  (l, m) => {
    l[m] = ~nam[0].indexOf(m)
      ? (f, ...ar) => a => a[m](f, ...ar)
      : ~nam[1].indexOf(m)
        ? (...ar) => a => [...a][m](...ar)
        : ~nam[2].indexOf(m)
          ? (...ar) => a => a[m](...ar)
          : ~nam[3].indexOf(m)
            ? (...ar) => a => {
                var t = [...a];
                t[m](...ar);
                return t;
              }
            : ~nam[4].indexOf(m) ? a => a[m]() : l[m];
    return l;
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

const hasMatchIn = (a = []) => (b = []) =>
  [a, b].reduce(
    (rs, ca, i) =>
      rs
        ? rs
        : ca.reduce(
            (r, c) => (r ? r : !!i ? a.includes(c) : b.includes(c)),
            false
          ),
    false
  );

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
  update,
  hasMatchIn
};
