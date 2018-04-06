const assoc = (k = '') => v => (o = {}) => ({ ...o, [k]: v });

const dissoc = (k = '') => (o = {}) =>
  Object.keys(o).reduce(
    (res, ck) => (ck === k ? res : { ...res, [ck]: o[ck] }),
    {}
  );

const deepClone = o =>
  Array.isArray(o)
    ? o.reduce(
        (res, cv) =>
          (Array.isArray(cv) || typeof cv === 'object') && cv !== null
            ? [...res, deepClone(cv)]
            : [...res, cv],
        []
      )
    : typeof o === 'object' && o !== null
      ? Object.keys(o).reduce(
          (res, ck) =>
            (Array.isArray(o[ck]) || typeof o[ck] === 'object') &&
            o[ck] !== null
              ? { ...res, [ck]: deepClone(o[ck]) }
              : { ...res, [ck]: o[ck] },
          {}
        )
      : o;

const eqProps = (k = '') => (o1 = {}) => (o2 = {}) => o1[k] === o2[k];

const has = (k = '') => (o = {}) => o.hasOwnProperty(k);

const invert = (o = {}) =>
  Object.keys(o).reduce(
    (res, ck) =>
      res[o[ck]]
        ? { ...res, [o[ck]]: [...res[o[ck]], ck] }
        : { ...res, [o[ck]]: [ck] },
    {}
  );

const keys = (o = {}) => Object.keys(o);

module.exports = {
  assoc,
  dissoc,
  deepClone,
  eqProps,
  has,
  invert,
  keys
};
