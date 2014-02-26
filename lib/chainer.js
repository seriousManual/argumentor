var path = require('path');

function chainer(subject, target, applied) {
    return function () {
        applied._currentParameter[target](require(path.join(__dirname, '../lib', subject)));

        return applied;
    }
}

module.exports = chainer;