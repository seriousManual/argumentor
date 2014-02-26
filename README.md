# Argumentor

[![Build Status](https://travis-ci.org/zaphod1984/argumentor.png)](https://travis-ci.org/zaphod1984/argumentor)

````
var foo2 = f(foo)
    .p('a').number()
    .p('b').bool().default(true)
    .p('c').function().default(function () {})
    .combinations([
        ['a', 'b', 'c'],
        ['a', 'c'],
        ['a']
    ]);
````