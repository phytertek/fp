const assoc = (k = '') => v => (o = {}) => ({ ...o, [k]: v });

const dissoc = (k = '') => (o = {}) =>
  Object.keys(o).reduce((r, c) => (c === k ? r : { ...r, [c]: o[c] }), {});

const clone = v =>
  Array.isArray(v)
    ? [...v]
    : typeof v === 'object' && v !== null ? { ...v } : v;

const deepClone = v =>
  Array.isArray(v)
    ? v.reduce(
        (r, c) =>
          (Array.isArray(c) || typeof c === 'object') && c !== null
            ? [...r, deepClone(c)]
            : [...r, c],
        []
      )
    : typeof v === 'object' && v !== null
      ? Object.keys(v).reduce(
          (r, c) =>
            (Array.isArray(v[c]) || typeof v[c] === 'object') && v[c] !== null
              ? { ...r, [c]: deepClone(v[c]) }
              : { ...r, [c]: v[c] },
          {}
        )
      : v;

const eqProps = (k = '') => (a = {}) => (b = {}) => a[k] === b[k];

const has = (k = '') => (o = {}) => o.hasOwnProperty(k);

const invert = (o = {}) =>
  Object.keys(o).reduce(
    (r, k) => ({ ...r, [o[k]]: [...(r[o[k]] || []), k] }),
    {}
  );
const keys = (o = {}) => Object.keys(o);

const values = (o = {}) => Object.values(o);

const merge = (a = {}) => (b = {}) => ({ ...a, ...b });

const evolve = (a = {}) => (o = {}) =>
  Object.keys(a).reduce((r, k) => ({ ...r, [k]: a[k](o[k]) }), { ...o });

const omit = (a = []) => (o = {}) =>
  Object.keys(o).reduce(
    (r, k) => (a.includes(k) ? r : { ...r, [k]: o[k] }),
    {}
  );

const path = (p = []) => (o = {}) =>
  p.reduce((r, c) => (!!r && !!r[c] ? r[c] : undefined), o);

const pick = (p = []) => (o = {}) =>
  p.reduce((r, k) => (!!o[k] ? { ...r, [k]: o[k] } : r), {});

module.exports = {
  assoc,
  dissoc,
  clone,
  deepClone,
  eqProps,
  has,
  invert,
  keys,
  values,
  merge,
  evolve,
  omit,
  path,
  pick
};
