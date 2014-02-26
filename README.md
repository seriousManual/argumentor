# Argumentor

[![Build Status](https://travis-ci.org/zaphod1984/argumentor.png)](https://travis-ci.org/zaphod1984/argumentor)

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
````