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
    .a('a').number()
    .a('b').string();

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
    .a('a').default('foo')
    .a('b').default(null);

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
    .a('name')
    .a('options')
    .a('callback')
    .combinations([['name', 'options', 'callback'], ['name', 'callback'], ['callback']]);

fooWrapped(function cb() {});                       //arguments would be [undefined, undefined, function cb() {}]
fooWrapped('barName', function cb() {});            //arguments would be ['barName', undefined, function cb() {}]
fooWrapped('barName', {a: 'b'}, function cb() {});  //arguments would be ['barName', {a: 'b'}, function cb() {}]
````

## Combined usage
The real power of argumentor comes into play when using this three abilities of argumentor in combination:
````javascript
var fooWrapped = argumentor(foo)
    .a('name').string().default('nameDefault')
    .a('options').object().default(function() { return {}; })
    .a('callback').func().default(function() { return function() {}; })
    .combinations([['name', 'options', 'callback'], ['name', 'callback'], ['callback']]);
````

# API

## argumentor(fn)
Creates a wrapped version of `fn`.
Features a list of configuration methods:

## .a(name)
Opens a context, the following configuration methods are invoked on that context.
`name` denotes a handle for the argument.
The order of argument contexts does matter!

## .bool()
Denotes that the current argument context should be casted to Boolean.

## .func()
Denotes that the current argument context should be checked to be a function.
If this is not the case, an error is thrown.

## .number()
Denotes that the current argument context should be casted to Number.

## .object()
Denotes that the current argument context should be checked to be a object.
If this is not the case, an error is thrown.

## .string()
Denotes that the current argument context should be casted to String.

## .default(value|fn)
Sets a default value for the argument of the current execution context.
If the assigned value is callable it will be invoked to retrieve a default value on run time.

Let's say your default value is an empty object of type `Foo`:
````javascript
var fooWrapped = argumentor(foo)
    .a('foo).object().default(function() {
        return new Foo();
    });
````

## .combinations(combinations)
Specifies possible argument combinations.
Has to be an array of arrays of Strings. The names in the combinations list refer to the names of the argument execution contexts.