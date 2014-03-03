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

    describe('default', function () {
        it('should set the default if all arguments are not set', function () {
            var config = {
                a: new Argument().setDefault('foo'),
                b: new Argument().setDefault(true),
                c: new Argument().setDefault({})
            };

            expect(sanitize([], config, ['a', 'b', 'c'])).to.deep.equal(['foo', true, {}]);
        });

        it('should set the default if some arguments are not set', function () {
            var config = {
                a: new Argument().setDefault('foo'),
                b: new Argument().setDefault(true),
                c: new Argument().setDefault({})
            };

            expect(sanitize([1, 2], config, ['a', 'b', 'c'])).to.deep.equal([1, 2, {}]);
        });

        it('should accept null als valid default', function () {
            var config = {
                a: new Argument().setDefault(null)
            };

            expect(sanitize([], config, ['a'])).to.deep.equal([null]);
        });
    });

    describe('combinations', function () {
        it('should adopt to possible arguments combinations', function () {
            var config = {
                name: new Argument(),
                options: new Argument(),
                callback: new Argument()
            };

            expect(sanitize(['nameValue', 'optionsValue', 'callbackValue'], config, ['name', 'options', 'callback'], [
                ['name', 'options', 'callback'],
                ['name', 'callback'],
                ['callback']
            ])).to.deep.equal(['nameValue', 'optionsValue', 'callbackValue']);

            expect(sanitize(['nameValue', 'callbackValue'], config, ['name', 'options', 'callback'], [
                ['name', 'options', 'callback'],
                ['name', 'callback'],
                ['callback']
            ])).to.deep.equal(['nameValue', undefined, 'callbackValue']);

            expect(sanitize(['callbackValue'], config, ['name', 'options', 'callback'], [
                ['name', 'options', 'callback'],
                ['name', 'callback'],
                ['callback']
            ])).to.deep.equal([undefined, undefined, 'callbackValue']);
        });

        it('should throw if no matching combination is found', function () {
            var config = {
                name: new Argument(),
                options: new Argument(),
                callback: new Argument()
            };

            expect(function() {
                sanitize(['nameValue', 'optionsValue', 'callbackValue'], config, ['name', 'options', 'callback'], [
                    ['callback']
                ]);
            }).to.throw();
        });
    });

});