var util = require('util');

function TypeError() {
    Error.call(this);
}

util.inherits(TypeError, Error);

module.exports = {
    TypeError: TypeError
};