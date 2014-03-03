var expect = require('chai').expect;

var Argument = require('../lib/Argument');

describe('Argument', function() {
    var arg;
    beforeEach(function() {
        arg = new Argument();
    });

    it('should do nothing on unset typer', function() {
        expect(arg.invokeTyper('foo')).to.equal('foo');
    });

    it('should invoke a typer that has been set before', function() {
        arg.setTyper(function(a) { return '|' + a + '|'; });

        expect(arg.invokeTyper('foo')).to.equal('|foo|');
    });

    it('should set a default', function() {
        expect(arg.hasDefault()).to.be.false;

        arg.setDefault('booya');

        expect(arg.hasDefault()).to.be.true;
        expect(arg.getDefault()).to.equal('booya');
    });

    it('should invoke callable default', function() {
        expect(arg.hasDefault()).to.be.false;

        arg.setDefault(function() {
            return {};
        });

        expect(arg.hasDefault()).to.be.true;
        expect(arg.getDefault()).to.deep.equal({});
    })
});