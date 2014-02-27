var errors = require('../errors');

module.exports = function (value) {
    if (typeof value !== 'function') throw new errors.TypeError('value is not a function');

    return value;
};