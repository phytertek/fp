const of = (...a) => [...a];

const once = fn => {
  let called = false;
  let result;
  return (...args) => {
    if (called) return result;
    called = true;
    result = fn(...args);
    return result;
  };
};

const always = v => {
  let constant = v;
  return () => {
    return constant;
  };
};

const either = a => b => (...args) => a(...args) || b(...args);

module.exports = {
  of,
  once,
  always,
  either
};
