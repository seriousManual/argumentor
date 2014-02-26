var expect = require('chai').expect;

var argumentor = require('../');

function foo(a, b, c) {
    return Array.prototype.slice.call(arguments, 0);
}

describe('integration', function () {

});