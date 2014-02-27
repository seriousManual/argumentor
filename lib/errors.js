var util = require('util');

function TypeError(message) {
    Error.call(this, message);
}

util.inherits(TypeError, Error);

module.exports = {
    TypeError: TypeError
};