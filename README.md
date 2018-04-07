# Phytertek JavaScript Functional Programming Arsenal

A library of useful fp methods

## Core

### import ->

```js
const { c } = require('fp-arsenal');
// or
const c = require('fp-arsenal/lib/core');
```

### methods ->

* curry
* compose
* pipe
* identity

### example ->

```js
const { c, a } = require('fp-arsenal');

const pipeline = c.pipe(
  a.map(v => v + v),
  a.reduce((r, c) => r + c),
  v => `Total :: ${v}`
);

const data = [1, 2, 3];

const result = pipeline(data); // 'Total :: 12'
```

... TBC
