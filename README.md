# Argumentor

[![Build Status](https://travis-ci.org/zaphod1984/argumentor.png)](https://travis-ci.org/zaphod1984/argumentor)

[![NPM](https://nodei.co/npm/argumentor.png)](https://nodei.co/npm/argumentor/)

[![NPM](https://nodei.co/npm-dl/argumentor.png?months=3)](https://nodei.co/npm/argumentor/)

## Types

Have you ever been doing this?
````
function foo(a, b) {
    a = +a;
    b = b + '';
    //...
}
````
Argumentor wraps your function and takes care of types:
````
var fooWrapped = argumentor(foo)
    .p('a').number()
    .p('b').string();

fooWrapped('1', 123); //arguments would be 1 and '123'
````

## Defaults

Have you ever been doing this?
````
function foo(a, b) {
    a = a || 'foo';
    b = b || null;
}
````
Argumentor wraps your function and takes care of defaults:
````
var fooWrapped = argumentor(foo)
    .p('a').default('foo')
    .p('b').default(null);
````

## Combinations

Have you ever been doing this?
````
function foo(name, options, callback) {
    if(typeof name === 'function') {
        callback = name;
        name = 'defaultName';
        options = {};
    } else if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    //maintenance nightmare!
}
````
Argumentor wraps your function and recognizes possibile argument combinations:
````
var fooWrapped = argumentor(foo)
    .p('name').default('defaultName')
    .p('options').default({})
    .p('callback').func()
    .combinations([['name', 'options', 'callback'], ['name', 'callback'], ['callback']]);
````