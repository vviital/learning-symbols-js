(() => {
  // What will be printed?
  function daz() {}

  const object = {
    foo: function() {},
    bar: function baz() {},
    bam: daz,
    zim() {},
  };

  console.log('object.foo.name', object.foo.name);
  console.log('object.bar.name', object.bar.name);
  console.log('object.bam.name', object.bam.name);
  console.log('object.zim.name', object.zim.name);
})();

(() => {
  const abc = function () {};

  console.log('abc', abc.name);
})();

(() => {
  class Parent {
    constructor() {
      console.log('new.target', new.target);
      if (new.target === Parent) {
        console.log('Parent instantiated');
      } else {
        console.log('A child instantiated');
      }
    }
  }

  class Child1 extends Parent {}

  const a = new Parent();
  const b = new Child1();
})();

// Well Known Symbols (WKS)

(() => {
  // Symbol iterator
  const array = [1, 2, 3, 4, 5, 6, 7];

  console.log(...array);

  array[Symbol.iterator] = function *useOddIndexes() {
    let idx = 1;
    while (this[idx]) {
      yield this[idx];

      idx += 2;
    }
  };

  console.log(...array);
})();

(() => {
  // Symbol.toStringTag and Symbol.hasInstance

  function Foo(greeting) { this.greeting = greeting; }

  let a = new Foo();

  console.log('a.toString()', a.toString());
  console.log('a instanceOf Foo', a instanceof Foo);

  Foo.prototype[Symbol.toStringTag] = 'Foo';

  // Note: To set @@hasInstance on a function, you must use Object.defineProperty(..),
  // as the default one on Function.prototype is writable: false.
  // See the this & Object Prototypes title of this series for more information.
  Object.defineProperty(Foo, Symbol.hasInstance, {
    value(inst) {
      return inst.greeting === 'hello';
    }
  });

  a = new Foo('hello');
  const b = new Foo('world');

  b[Symbol.toStringTag] = 'cool';

  console.log('a.toString()', a.toString());
  console.log('b.toString()', b.toString());
  console.log('String(a)', String(a));
  console.log('String(b)', String(b));

  console.log('a instanceOf Foo', a instanceof Foo);
  console.log('b instanceOf Foo', b instanceof Foo);
})();

(() => {
  // Symbol.species

  class MyArray extends Array {
    isEmpty() {
      return this.length === 0;
    }

    static get [Symbol.species]() {
      return Array;
    }
  }

  let array = new MyArray(2, 3, 4);

  console.log('array instanceof MyArray', array instanceof MyArray);
  console.log('array instanceof Array', array instanceof Array);

  console.log('array.isEmpty()', array.isEmpty());

  let odds = array.filter(item => item % 2 === 1);

  console.log('odds instanceof MyArray', odds instanceof MyArray);
  console.log('odds instanceof Array', odds instanceof Array);
})();

(() => {
  // Symbol.species

  class Cool {
    // defer '@@species' to derived constructor
    static get [Symbol.species]() { return this; }

    again() { return new this.constructor[Symbol.species](); }
  }

  class Fun extends Cool {};

  class Awesome extends Cool {
    // force '@@species' to be parent constructor
    static get [Symbol.species]() { return Cool; }
  }

  const a = new Fun();
  const b = new Awesome();
  const c = a.again();
  const d = b.again();

  console.log('c instanceof Fun', c instanceof Fun);
  console.log('d instanceof Awesome', d instanceof Awesome);
  console.log('d instanceof Cool', d instanceof Cool);
})();

(() => {
  // Symbol.toPrimitive

  const arr = [1, 2, 3, 4, 5];

  console.log('arr + 10', arr + 10);

  arr[Symbol.toPrimitive] = function (hint) {
    console.log('hint', hint);
    if (hint === 'default' || hint === 'number') {
      return this.reduce((acc, curr) => acc + curr, 0);
    }
  };

  console.log('arr + 10', arr + 10);
  console.log('arr * 10', arr * 10);
  console.log('arr == 15', arr == 15);
  console.log('arr === 15', arr === 15);
  console.log('arr == arr', arr == arr);
  console.log('arr === arr', arr === arr);
})();

(() => {
  // Symbol.isConcatSpreadable

  const a = [1, 2, 3];
  const b = [4, 5, 6];

  console.log('[].concat(a, b)', [].concat(a, b));
  console.log('[...a, ...b]', [...a, ...b]);

  b[Symbol.isConcatSpreadable] = false;

  console.log('[].concat(a, b)', [].concat(a, b));
  console.log('[...a, ...b]', [...a, ...b]);
})();

(() => {
  // Symbol.unscopables
  const object = { a: 1, b: 2, c: 3 };
  const a = 10, b = 20, c = 30;

  object[Symbol.unscopables] = {
    a: false,
    b: true,
    c: false,
  };

  with (object) {
    console.log(a, b, c);
  }
})();
