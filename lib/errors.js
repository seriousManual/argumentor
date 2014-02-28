var util = require('util');

function TypeError(message) {
    Error.call(this, message);
}

util.inherits(TypeError, Error);

function ArgumentError(message) {
    Error.call(this, message);
}

util.inherits(ArgumentError, Error);

module.exports = {
    TypeError: TypeError,
    ArgumentError: ArgumentError
};