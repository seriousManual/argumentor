var expect = require('chai').expect;

var typer = require('../lib/typer');
var Parameter = require('../lib/Parameter');
var sanitize = require('../lib/sanitize');

describe('sanitize', function() {

    describe('types', function() {
        it('should transform', function() {
            var config ={
                a: new Parameter().typer(function(v) { return '|' + v + '|'; }),
                b: new Parameter().typer(function(v) { return '+' + v + '+'; }),
                c: new Parameter().typer(function(v) { return '-' + v + '-'; })
            };

            expect(sanitize(['a', 'b', 'c'], config)).to.deep.equal(['|a|', '+b+', '-c-']);
        });
    });

});