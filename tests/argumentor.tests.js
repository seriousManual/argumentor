var expect = require('chai').expect;
var sandboxed = require('sandboxed-module');
var sinon = require('sinon');

var sanitizeStub = sinon.stub().returns(['foo']);

var argumentor = sandboxed.require('../', {
    requires: {
        './lib/chainer': function (subject, target, applied) {
            return function bert() {
                bert.subject = subject;
                bert.target = target;

                return applied;
            }
        },
        './lib/sanitize': sanitizeStub,
        './lib/Argument': function () {
        }
    }
});

describe('argumentor', function () {

    function foo() {
        return Array.prototype.slice.call(arguments, 0);
    }

    it('should', function () {
        var foo2 = argumentor(foo)
            .a('a').number()
            .a('b').string()
            .a('c').object()
            .a('d').bool()
            .a('e').func()
            .a('a').number()
            .combinations([['a']]);

        expect(foo2._argumentsConfig).to.deep.equal({
            a: {}, b: {}, c: {}, d: {}, e: {}
        });

        expect(foo2.number.subject).to.equal('typer/number');
        expect(foo2.string.subject).to.equal('typer/string');
        expect(foo2.object.subject).to.equal('typer/object');
        expect(foo2.bool.subject).to.equal('typer/bool');
        expect(foo2.func.subject).to.equal('typer/func');
        expect(foo2.number.target).to.equal('setTyper');
        expect(foo2.string.target).to.equal('setTyper');
        expect(foo2.object.target).to.equal('setTyper');
        expect(foo2.bool.target).to.equal('setTyper');
        expect(foo2.func.target).to.equal('setTyper');

        expect(foo2('a')).to.deep.equal(['foo']);
        expect(sanitizeStub.args).to.deep.equal([
            [
                [ 'a' ],
                { a: {}, b: {}, c: {}, d: {}, e: {} },
                ['a', 'b', 'c', 'd', 'e'],
                [['a']]
            ]
        ]);
    });


    it('should throw if no execution context exists', function() {
        var argumentor = require('../');

        expect(function() {
            argumentor(foo).number();
        }).throw(Error, /missing execution context/);
    });

});