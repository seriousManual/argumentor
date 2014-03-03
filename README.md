# Argumentor

[![Build Status](https://travis-ci.org/zaphod1984/argumentor.png)](https://travis-ci.org/zaphod1984/argumentor)

[![NPM](https://nodei.co/npm/argumentor.png)](https://nodei.co/npm/argumentor/)

[![NPM](https://nodei.co/npm-dl/argumentor.png?months=3)](https://nodei.co/npm/argumentor/)

Argumentor is a little utility tool that brings types, defaults and arbitrary combinations to your function's arguments.

## Types

Have you ever been doing this?
````javascript
function foo(a, b) {
    a = +a;         //Number cast
    b = b + '';     //String cast
    //...
}
````
Argumentor wraps your function and takes care of types:
````javascript
var fooWrapped = argumentor(foo)
    .p('a').number()
    .p('b').string();

fooWrapped('1', 123); //arguments would be [1, '123']
````

## Defaults

Have you ever been doing this?
````javascript
function foo(a, b) {
    a = a || 'foo';
    b = b || null;
    //...
}
````
Argumentor wraps your function and takes care of defaults:
````javascript
var fooWrapped = argumentor(foo)
    .p('a').default('foo')
    .p('b').default(null);

fooWrapped(); //arguments would be ['foo', null]
````

## Combinations

Have you ever been doing this?
````javascript
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
````javascript
var fooWrapped = argumentor(foo)
    .p('name')
    .p('options')
    .p('callback')
    .combinations([['name', 'options', 'callback'], ['name', 'callback'], ['callback']]);

fooWrapped(function cb() {});                       //arguments would be [undefined, undefined, function cb() {}]
fooWrapped('barName', function cb() {});            //arguments would be ['barName', undefined, function cb() {}]
fooWrapped('barName', {a: 'b'}, function cb() {});  //arguments would be ['barName', {a: 'b'}, function cb() {}]
````

## Combined usage
The real power of argumentor comes into play when using this three abilities of argumentor in combination:
````javascript
var fooWrapped = argumentor(foo)
    .p('name').string().default('nameDefault')
    .p('options').object().default(function() { return {}; })
    .p('callback').func().default(function() { return function() {}; })
    .combinations([['name', 'options', 'callback'], ['name', 'callback'], ['callback']]);
````