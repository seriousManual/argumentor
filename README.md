# Argumentor

[![Build Status](https://travis-ci.org/zaphod1984/argumentor.png)](https://travis-ci.org/zaphod1984/argumentor)

[![NPM](https://nodei.co/npm/argumentor.png)](https://nodei.co/npm/argumentor/)

[![NPM](https://nodei.co/npm-dl/argumentor.png?months=3)](https://nodei.co/npm/argumentor/)

````
function foo(a, b, c) {
    return Array.prototype.slice.call(arguments, 0);
}

var foo2 = argumentor(foo)
    .p('a').number()
    .p('b').string()
    .p('c').bool();

console.log(foo2('1'));  // [1]
console.log(foo2('1', 1)); // [1, '1']
console.log(foo2('1', 1, 100)); // [1, '1', true]

var foo2 = argumentor(foo)
    .p('a').number().default(10)
    .p('b').string().default(42)
    .p('c').bool().default(true);

console.log(foo2());  // [10, '42', true]
console.log(foo2('1'));  // [1, '42', true]
console.log(foo2('1', 23)); // [1, '23', true]
console.log(foo2('1', 23, false)); // [1, '23', false]
````