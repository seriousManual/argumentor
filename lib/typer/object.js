var errors = require('../errors');

module.exports = function (value) {
    if (typeof value !== 'object') throw new errors.TypeError('value is not a object');

    return value;
};