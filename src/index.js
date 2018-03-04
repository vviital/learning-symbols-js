(() => {
  let sym = Symbol('test symbol');

  console.log('typeof sym', typeof sym);
  console.log('sym.toString()', sym.toString());

  // sym is not instance of Symbol

  console.log('sym instanceof Symbol', sym instanceof Symbol);

  let symWrapper = Object(sym);

  console.log('symWrappersym instanceof Symbol', symWrapper instanceof Symbol);
  console.log('symWapper === sym', symWrapper === sym);
  console.log('symWapper == sym', symWrapper == sym);
  console.log('symWapper.valueOf() == sym', symWrapper.valueOf() === sym);
})();

(() => {
  // Symbol usage (local diclaration)
  let INSTANCE = Symbol('instance');

  function HappyFace() {
    if (HappyFace[INSTANCE]) return HappyFace[INSTANCE];

    let smile = () => console.log('=)');

    HappyFace[INSTANCE] = { smile };

    return HappyFace[INSTANCE];
  }

  let me = HappyFace();
  let you = HappyFace();

  console.log('me === you', me === you);
  console.log('HappyFace', HappyFace);
  console.log('HappyFace[INSTANCE]', HappyFace[INSTANCE]);
})();

(() => {
  // Symbol usage (global registry)
  function HappyFace() {
    let INSTANCE = Symbol.for('instance');

    if (HappyFace[INSTANCE]) return HappyFace[INSTANCE];

    let smile = () => console.log('=)');

    HappyFace[INSTANCE] = { smile };

    return HappyFace[INSTANCE];
  }

  let me = HappyFace();
  let you = HappyFace();

  console.log('me === you', me === you);
  console.log('HappyFace', HappyFace);
  console.log('HappyFace[INSTANCE]', HappyFace[Symbol.for('instance')]);
})();

(() => {
  // Symbol.keyFor

  const s = Symbol.for('test');

  const str = Symbol.keyFor(s);

  const ns = Symbol.for(str);

  console.log('s === ns', s === ns);
})();

(() => {
  // Symbol.keyFor local symbols

  const s = Symbol('test');

  const str = Symbol.keyFor(s);

  console.log('str', str);
})();

(() => {
  const bigJs = {
    personsCount: 4,
    [Symbol('isCool')]: () => true,
  };

  console.log('Object.getOwnPropertyNames(bigJs)', Object.getOwnPropertyNames(bigJs));

  console.log('Object.getOwnPropertySymbols(bigJs)', Object.getOwnPropertySymbols(bigJs));
})();
