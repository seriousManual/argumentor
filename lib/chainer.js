var path = require('path');

function chainer(subject, target, applied) {
    return function () {
        if(!applied._currentArgument) throw new Error('missing execution context');

        applied._currentArgument[target](require(path.join(__dirname, '../lib', subject)));

        return applied;
    }
}

module.exports = chainer;