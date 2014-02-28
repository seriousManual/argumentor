var expect = require('chai').expect;

var Parameter = require('../lib/Parameter');
var sanitize = require('../lib/sanitize');

describe('sanitize', function () {

    describe('types', function () {
        it('should transform', function () {
            var config = {
                a: new Parameter().setTyper(function (v) {
                    return '|' + v + '|';
                }),
                b: new Parameter().setTyper(function (v) {
                    return '+' + v + '+';
                }),
                c: new Parameter().setTyper(function (v) {
                    return '-' + v + '-';
                })
            };

            expect(sanitize(['z', 'y', 'x'], config)).to.deep.equal(['|z|', '+y+', '-x-']);
        });

        it('should transform even when more arguments are assigned than declared', function () {
            var config = {
                a: new Parameter().setTyper(function (v) {
                    return '|' + v + '|';
                })
            };

            expect(sanitize(['foo', 'bar'], config)).to.deep.equal(['|foo|', 'bar']);
        });
    });

    describe('default', function() {
        it('should set the default if all arguments are not set', function() {
            var config = {
                a: new Parameter().setDefault('foo'),
                b: new Parameter().setDefault(true),
                c: new Parameter().setDefault({})
            };

            expect(sanitize([], config)).to.deep.equal(['foo', true, {}]);
        });

        it('should set the default if some arguments are not set', function() {
            var config = {
                a: new Parameter().setDefault('foo'),
                b: new Parameter().setDefault(true),
                c: new Parameter().setDefault({})
            };

            expect(sanitize([1, 2], config)).to.deep.equal([1, 2, {}]);
        });
    });

});