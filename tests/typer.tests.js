var expect = require('chai').expect;

var getTyper = require('../lib/chainer');
var errors = require('../lib/errors');

describe('typer', function () {
    var paramMock;

    beforeEach(function () {
        paramMock = {
            _typer: null,
            _currentArgument: {
                setTyper: function (typer) {
                    paramMock._typer = typer;
                }
            }
        };
    });

    describe('bool', function () {
        beforeEach(function () {
            var typer = getTyper('typer/bool', 'setTyper', paramMock);

            typer();
        });

        it('should cast to true (trueish value)', function () {
            expect(paramMock._typer('1')).to.be.true;
            expect(paramMock._typer('0')).to.be.true;
            expect(paramMock._typer('foobar')).to.be.true;
        });

        it('should cast to false (falsy value)', function () {
            expect(paramMock._typer('')).to.be.false;
            expect(paramMock._typer(0)).to.be.false;
        });

        it('should stay the same (booleans)', function () {
            expect(paramMock._typer(true)).to.be.true;
            expect(paramMock._typer(false)).to.be.false;
        });
    });

    describe('number', function () {
        beforeEach(function () {
            typer = getTyper('typer/number', 'setTyper', paramMock);

            typer();
        });

        it('should cast numbers', function () {
            expect(paramMock._typer('1337')).to.equal(1337);
            expect(paramMock._typer(42)).to.equal(42);
        });

        it('should throw if NaN', function () {
            expect(function () {
                paramMock._typer('foo')
            }).to.throw(errors.TypeError);
        });
    });

    describe('function', function () {
        beforeEach(function () {
            typer = getTyper('typer/func', 'setTyper', paramMock);

            typer.call();
        });

        it('should return function', function () {
            var foo = function () {
            };
            expect(paramMock._typer(foo)).to.equal(foo);
        });

        it('should throw if not a function', function () {
            expect(function () {
                paramMock._typer('foo')
            }).to.throw(errors.TypeError);
        });
    });

    describe('object', function () {
        beforeEach(function () {
            typer = getTyper('typer/object', 'setTyper', paramMock);

            typer.call();
        });

        it('should return object', function () {
            var foo = {};
            expect(paramMock._typer(foo)).to.equal(foo);
        });

        it('should throw if not an object', function () {
            expect(function () {
                paramMock._typer('foo')
            }).to.throw(errors.TypeError);
        });
    });

    describe('string', function () {
        beforeEach(function () {
            typer = getTyper('typer/string', 'setTyper', paramMock);

            typer.call();
        });

        it('should return a string', function () {
            expect(paramMock._typer(1)).to.equal('1');
            expect(paramMock._typer('foo')).to.equal('foo');
        });
    });
});