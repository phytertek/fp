// const equals = x => y =>
//   x.reduce((acc, cv, i) => (acc ? y[i] === cv : acc), true);

// // console.log(7);
// // console.log(7 + 1);
// // console.log(7 + 2);
// // console.log('Hello');

// // const hello = 'Hello';
// // hello;

// // const arr = [1, 2, 3];
// // arr;

// // const foo = {
// //   bar: 'bar'
// // };

// // const a = 'a';
// // const oldA = { a: a };
// // const oA = { a };

// // const b = 'b';
// // const oB = { b };

// // const c = { ...oA, ...oB };
// // c;

// // const [t, u] = ['a', 'b'];
// // t;
// // u;

// // const blep = {
// //   blop: 'blop'
// // };

// // const { blop } = blep;
// // blop;

// // const { blop: bloop } = blep;
// // bloop;

// // console.log(3 + 1 === 4);

// // double(x: n) => Number
// // const double = x => x * 2;
// // const increment = x => x + 1;

// // console.log(double);

// // console.log(double.toString());

// // console.log(double(4));

// // const orZero = (n = 0) => n;
// // console.log(orZero(1));
// // console.log(orZero());

// // const aTail = (head, ...tail) => tail;
// // console.log(aTail(1, 2, 3, 5));

// // console.log(aTail(...arr));

// // const shiftToLast = (head, ...tail) => [...tail, head];
// // console.log(shiftToLast(1, 2, 3));
// // console.log(shiftToLast(...arr));

// // const highPass = cutoff => n => n >= cutoff;
// // const gt4 = highPass(4);
// // gt4;
// // console.log(gt4(6));
// // console.log(gt4(3));

// // Tiny recursive autocurry
// const curry = (f, arr = []) => (...args) =>
//   (a => (a.length === f.length ? f(...a) : curry(f, a)))([...arr, ...args]);
// // const add3 = curry((a, b, c) => a + b + c);
// // console.log(add3);
// // console.log(add3(1)(2)(3));
// // console.log(add3(1, 2)(3));
// // console.log(add3(1, 2, 3));
// // console.log(add3(1)(2, 3));

// // functors
// // const functor = [1, 2, 3]
// // const doubled = functor.map(double)
// // console.log(doubled)

// // // Functor Laws

// // // Identity
// // const identity = x => x // returns passed arg
// // const identified = functor.map(identity)
// // console.log(identified)
// // // Composition
// // // Functors must obey the composition law: F.map(x => f(g(x))) is equivalent to F.map(g).map(f)

// // const sequential = functor.map(double).map(increment)
// // // ===
// // const composed = functor.map(x => increment(double(x)))

// // console.log(sequential, composed, equals(sequential)(composed)) //[3, 5, 7] [3, 5, 7] true

// // Endofunctors
// // An endofunctor is a functor that maps from a category back to the same category.
// // A functor can map from category to category: X -> Y

// // An endofunctor maps from a category to the same category: X -> X

// // A monad is an endofunctor.

// // A functor
// // const Identity = value => ({
// //   map: fn => Identity(fn(value))
// // });

// const trace = x => {
//   console.log(x);
//   return x;
// };

// // const u = Identity(2);

// // // Identity Law
// // u.map(trace); // 2
// // u.map(x => x).map(trace); // 2

// // const f = n => n + 1;
// // const g = n => n * 2;

// // // Composition Law
// // const r1 = u.map(x => f(g(x)));
// // const r2 = u.map(g).map(f);

// // r1.map(trace); // 5
// // r2.map(trace); // 5

// // Now you can map over any data type, just like you can map over an array. Nice!

// // That’s about as simple as a functor can get in JavaScript, but it’s missing some features we expect from data types in JavaScript. Let’s add them. Wouldn’t it be cool if the + operator could work for number and string values?

// // To make that work, all we need to do is implement .valueOf() -- which also seems like a convenient way to unwrap the value from the functor:

// const Identity = value => ({
//   map: fn => Identity(fn(value)),
//   valueOf: () => value,
//   toString: () => `Identity(${value})`,
//   [Symbol.iterator]: function*() {
//     yield value;
//   },
//   constructor: Identity
// });

// Object.assign(Identity, {
//   toString: () => 'Identity',
//   is: x => typeof x.map === 'function'
// });

// const ints = Identity(2) + Identity(4);
// trace(ints); // 6

// const hi = Identity('h') + Identity('i');
// trace(hi); // "hi"

// // Nice. But what if we want to inspect an Identity instance in the console? It would be cool if it would say "Identity(value)", right. Let's add a .toString() method:
// // Identity.toString = () => `Identity(${value})`;
// // Cool. We should probably also enable the standard JS iteration protocol. We can do that by adding a custom iterator:
// // [Symbol.iterator] enables standard JS iterations:
// const arr = [6, 7, ...Identity(8)];
// trace(arr); // [6, 7, 8]

// const fRange = (start, end) =>
//   Array.from({ length: end - start + 1 }, (x, i) => Identity(i + start));

// //   Why Functors?
// // Functors are great for lots of reasons. Most importantly, they’re an abstraction that you can use to implement lots of useful things in a way that works with any data type. For instance, what if you want to kick off a chain of operations, but only if the value inside the functor is not undefined or null?

// const exists = x => x.valueOf() !== undefined && x.valueOf() !== null;

// const ifExists = x => ({
//   map: fn => (exists(x) ? x.map(fn) : x)
// });

// const add1 = n => n + 1;
// const double = n => n * 2;

// ifExists(Identity(undefined)).map(trace); // Nooope
// ifExists(Identity(null)).map(trace); // Nodda

// //42
// ifExists(Identity(20))
//   .map(add1)
//   .map(double)
//   .map(trace);

// const map = curry((fn, F) => F.map(fn));

// const mdouble = map(double);

// mdouble(Identity(4)).map(trace); // 8

// // Conclusion
// // Functors are things we can map over. More specifically, a functor is a mapping from category to category. A functor can even map from a category back to the same category (i.e., an endofunctor).

// // A category is a collection of objects, with arrows between objects. Arrows represent morphisms (aka functions, aka compositions). Each object in a category has an identity morphism (x => x). For any chain of objects A -> B -> C there must exist a composition A -> C.

// // Functors are great higher-order abstractions that allow you to create a variety of generic functions that will work for any data type.

// // Functional Mixins
// const chocolate = {
//   hasChocolate: () => true
// };

// const caramelSwirl = {
//   hasCaramelSwirt: () => true
// };

// const pecans = {
//   hasPecans: () => true
// };

// const iceCream = { ...chocolate, ...caramelSwirl, ...pecans };

// // {
// //   hasChocolate: true,
// //   hasCaramelSwirt: true,
// //   hasPecans: true
// // }
// console.log(
//   `{\n${Object.keys(iceCream)
//     .map(f => `  ${f}: ${iceCream[f]()}`)
//     .join(',\n')}\n}`
// );

// // Functional Inheritance === Tight Coupling from inheritance

// // const base = spec => {
// //   const that = { name: spec.name };
// //   return that;
// // };

// // const child = spec => {
// //   const that = base(spec);
// //   Object.assign(that, { sayHello: () => `Hello, I'm ${that.name}` });
// //   return that;
// // };

// // const result = child({ name: 'a functional object' });
// // console.log(result.sayHello()); // "Hello, I'm a functional object"

// // A Functional Mixin
// const flying = o => {
//   let isFlying = false;
//   return {
//     ...o,
//     ...{
//       fly() {
//         isFlying = true;
//         return this;
//       },
//       isFlying: () => isFlying,
//       land() {
//         isFlying = false;
//         return this;
//       }
//     }
//   };
// };

// const bird = flying({});
// console.log(bird.isFlying()); // false
// console.log(bird.fly().isFlying()); // true

// const quacking = quack => o => ({
//   ...o,
//   ...{
//     quack: () => quack
//   }
// });

// const quacker = quacking('quack')({});
// console.log(quacker.quack());

// // Composing Functional Mixins
// // Functional mixins can be composed with simple function composition:
// // const createDuck = quack => quacking(quack)(flying({})); //Awkward...

// // const duck = createDuck('Quack!');

// // console.log(duck.fly().quack());

// //////

// const pipe = (...fns) => x => fns.reduce((y, f) => f(y), (x = {}));

// const createDuck = quack => pipe(flying, quacking(quack))();

// const duck = createDuck('Quack!');

// console.log(duck.fly().quack());

// // When to Use Functional Mixins
// // You should always use the simplest possible abstraction to solve the problem you’re working on. Start with a pure function. If you need an object with persistent state, try a factory function. If you need to build more complex objects, try functional mixins.

// // Here are some good use-cases for functional mixins:

// // Application state management, e.g., a Redux store.
// // Certain cross-cutting concerns and services, e.g., a centralized logger.
// // Composable functional data types, e.g., the JavaScript Array type implements Semigroup, Functor, Foldable. Some algebraic structures can be derived in terms of other algebraic structures, meaning that certain derivations can be composed into a new data type without customization.
// // Caveats
// // Most problems can be elegantly solved using pure functions. The same is not true of functional mixins. Like class inheritance, functional mixins can cause problems of their own. In fact, it’s possible to faithfully reproduce all of the features and problems of class inheritance using functional mixins.

// // You can avoid that, though, using the following advice:

// // Use the simplest practical implementation. Start on the left and move to the right only as needed: pure functions > factories > functional mixins > classes.
// // Avoid the creation of is-a relationships between objects, mixins, or data types.
// // Avoid implicit dependencies between mixins — wherever possible, functional mixins should be self-contained, and have no knowledge of other mixins.
// // “Functional mixins” doesn’t mean “functional programming”.
// // There may be side-effects when you access a property using Object.assign() or object spread syntax ({...}). You’ll also skip any non-enumerable properties. ES2017 added Object.getOwnPropertyDescriptors() to get around this problem.
// // If you’re tempted to use functional mixins in any scope larger than your own small projects, you should probably look at stamps, instead. The Stamp Specification is a standard for sharing and reusing composable factory functions, with built-in mechanisms to deal with property descriptors, prototype delegation, and so on.

// /**A factory function is any function which is not a class or constructor that returns a (presumably new) object. In JavaScript, any function can return an object. When it does so without the new keyword, it’s a factory function.

// Factory functions have always been attractive in JavaScript because they offer the ability to easily produce object instances without diving into the complexities of classes and the new keyword. */

// const createUser = ({ userName, avatar }) => ({
//   userName,
//   avatar,
//   setUserName(userName) {
//     this.userName = userName;
//     return this;
//   }
// });

/*
{
  "avatar": "echo.png",
  "userName": "echo",
  "setUserName": [Function setUserName]
}
*/
// console.log(createUser({ userName: 'echo', avatar: 'echo.png' }));

// console.log(user.setUserName('Foo').userName);

// const swap = ([a, b]) => [b, a];

// const rotate = ([a, ...b]) => [...b, a];
// const rotateBack = a =>
//   a.reduce((b, x, i) => (i === a.length - 1 ? [x, ...b] : [...b, x]), []);

/**
 * Factory Functions for Mixin Composition
Factories are great at cranking out objects using a nice calling API. Usually, they’re all you need, but once in a while, you’ll find yourself building similar features into different types of objects, and you’ll want to abstract those features into functional mixins so you can reuse them more easily.

That’s where functional mixins shine. Let’s build a withConstructor mixin to add the .constructor property to all object instances.
 */

// const withConstructor = constructor => o => {
//   const proto = { ...Object.getPrototypeOf(o), constructor };
//   return { ...Object.create(proto), o };
// };

/// Monads
// const x = 20;
// const f = n => n * 2;
// const arr = [x];1  

// // .map() applies the function f to the value x
// // in the context of the array
// const result = arr.map(f);
// console.log(result); // [40]

// const concatedArrEx = [].concat.apply([], [[1], [2, 3], [4]]);
// console.log(concatedArrEx);

{
//   //Identiy Monad
//   const Id = value => ({
//     map: f => Id.of(f(value)),
//     chain: f => f(value),
//     toString: () => `Id(${value})`
//   });

//   Id.of = Id;
// }

// {
//   const x = 20;
//   const p = Promise.resolve(x);
//   const f = n => Promise.resolve(n * 2);
//   const result = p.then(f);
//   result.then(r => console.log(r));
// }