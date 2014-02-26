var expect = require('chai').expect;

var getTyper = require('../lib/typer');
var errors = require('../lib/errors');

describe('typer', function() {
    var paramMock, typer;

    beforeEach(function() {
        paramMock = {
            _typer: null,
            _currentParameter: {
                typer: function(typer) {
                    paramMock._typer = typer;
                }
            }
        };
    });

    describe('bool', function() {
        beforeEach(function() {
            typer = getTyper('bool');

            typer.call(paramMock);
        });

        it('should cast to true (trueish value)', function() {
            expect(paramMock._typer('1')).to.be.true;
            expect(paramMock._typer('0')).to.be.true;
            expect(paramMock._typer('foobar')).to.be.true;
        });

        it('should cast to false (falsy value)', function() {
            expect(paramMock._typer('')).to.be.false;
            expect(paramMock._typer(0)).to.be.false;
        });

        it('should stay the same (booleans)', function() {
            expect(paramMock._typer(true)).to.be.true;
            expect(paramMock._typer(false)).to.be.false;
        });
    });

    describe('number', function() {
        beforeEach(function() {
            typer = getTyper('number');

            typer.call(paramMock);
        });

        it('should cast numbers', function() {
            expect(paramMock._typer('1337')).to.equal(1337);
            expect(paramMock._typer(42)).to.equal(42);
        });

        it('should throw if NaN', function() {
            expect(function() {
                paramMock._typer('foo')
            }).to.throw(errors.TypeError);
        });
    });
});