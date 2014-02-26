var errors = require('../errors');

module.exports = function() {
    this._currentParameter.typer(function(value) {
        if(typeof value !== 'object') throw new errors.TypeError('value is not a object');

        return value;
    });

    return this;
};