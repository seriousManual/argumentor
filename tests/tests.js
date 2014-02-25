var expect = require('chai').expect;

var f = require('../');

function foo(a, b, c) {
    return Array.prototype.slice.call(arguments, 0);
}

describe('f', function () {

    it('should sanitize numbers', function () {
        var foo2 = f(foo).p('a').number();

        expect(foo2('1')).to.deep.equal([1]);
    });

});




//var foo2 = f(foo)
//    .p('a').number()
//    .p('b').bool().default(true)
//    .p('c').function().default(function () {})
//    .combinations([
//        ['a', 'b', 'c'],
//        ['a', 'c'],
//        ['a']
//    ]);