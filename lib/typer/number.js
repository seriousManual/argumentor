var errors = require('../errors');

module.exports = function () {
    this._currentParameter.typer(function(value) {
        if(isNaN(value)) throw new errors.TypeError('value is not a number');

        return Number(value);
    });

    return this;
};