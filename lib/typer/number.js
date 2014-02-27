var errors = require('../errors');

module.exports = function(value) {
    if (isNaN(value)) throw new errors.TypeError('value is not a number');

    return Number(value);
};