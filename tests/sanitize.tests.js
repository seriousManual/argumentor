var expect = require('chai').expect;

var Argument = require('../lib/Argument');
var sanitize = require('../lib/sanitize');

describe('sanitize', function () {

    describe('types', function () {
        it('should transform', function () {
            var config = {
                a: new Argument().setTyper(function (v) {
                    return '|' + v + '|';
                }),
                b: new Argument().setTyper(function (v) {
                    return '+' + v + '+';
                }),
                c: new Argument().setTyper(function (v) {
                    return '-' + v + '-';
                })
            };

            expect(sanitize(['z', 'y', 'x'], config, ['a', 'b', 'c'])).to.deep.equal(['|z|', '+y+', '-x-']);
        });

        it('should transform even when more arguments are assigned than declared', function () {
            var config = {
                a: new Argument().setTyper(function (v) {
                    return '|' + v + '|';
                })
            };

            expect(sanitize(['foo', 'bar'], config, ['a'])).to.deep.equal(['|foo|', 'bar']);
        });
    });

    describe('default', function() {
        it('should set the default if all arguments are not set', function() {
            var config = {
                a: new Argument().setDefault('foo'),
                b: new Argument().setDefault(true),
                c: new Argument().setDefault({})
            };

            expect(sanitize([], config, ['a', 'b', 'c'])).to.deep.equal(['foo', true, {}]);
        });

        it('should set the default if some arguments are not set', function() {
            var config = {
                a: new Argument().setDefault('foo'),
                b: new Argument().setDefault(true),
                c: new Argument().setDefault({})
            };

            expect(sanitize([1, 2], config, ['a', 'b', 'c'])).to.deep.equal([1, 2, {}]);
        });
    });

});