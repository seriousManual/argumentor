var expect = require('chai').expect;

var argumentor = require('../');

function foo(a, b, c) {
    return Array.prototype.slice.call(arguments, 0);
}

describe('integration', function () {
    it('should accept a this value', function() {
        var testFunction = function(a) {
            this.a = a;
        };

        var bar = {a: 'spam'};

        argumentor(testFunction, bar)('eggs');

        expect(bar).to.deep.equal({a:'eggs'});
    });

    describe('types', function() {
        it('should cast one parameter', function() {
            var foo2 = argumentor(foo).p('a').number();

            expect(foo2('1')).to.deep.equal([1]);
            expect(foo2('1.1')).to.deep.equal([1.1]);
        });

        it('should cast multiple parameters', function() {
            var foo2 = argumentor(foo)
                .p('a').number()
                .p('b').string()
                .p('c').bool();

            expect(foo2('1')).to.deep.equal([1]);
            expect(foo2('1', 1)).to.deep.equal([1, '1']);
            expect(foo2('1', 1, 100)).to.deep.equal([1, '1', true]);
        });
    });
});