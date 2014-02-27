var expect = require('chai').expect;

var Parameter = require('../lib/Parameter');
var sanitize = require('../lib/sanitize');

describe('sanitize', function () {

    describe('types', function () {
        it('should transform', function () {
            var config = {
                a: new Parameter().typer(function (v) {
                    return '|' + v + '|';
                }),
                b: new Parameter().typer(function (v) {
                    return '+' + v + '+';
                }),
                c: new Parameter().typer(function (v) {
                    return '-' + v + '-';
                })
            };

            expect(sanitize(['z', 'y', 'x'], config)).to.deep.equal(['|z|', '+y+', '-x-']);
        });

        it('should transform even when more arguments are assigned than declared', function () {
            var config = {
                a: new Parameter().typer(function (v) {
                    return '|' + v + '|';
                })
            };

            expect(sanitize(['foo', 'bar'], config)).to.deep.equal(['|foo|', 'bar']);
        });
    });

});