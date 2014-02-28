var errors = require('./lib/errors');
var chainer = require('./lib/chainer');

var sanitize = require('./lib/sanitize');
var Argument = require('./lib/Argument');

function argumentor(client, thisValue) {
    function applied() {
        var argumentsArray = Array.prototype.slice.call(arguments, 0);
        var sanitizedArguments = sanitize(argumentsArray, applied._argumentsConfig, applied._argumentsOrder);

        return client.apply(thisValue || null, sanitizedArguments);
    }

    applied._currentArgument = null;
    applied._argumentsConfig = {};
    applied._argumentsOrder = [];

    applied.p = function (name) {
        if (!name) throw new errors.ParameterError('parameter name missing');

        var tmpArgument;
        if (!applied._argumentsConfig[name]) {
            tmpArgument = new Argument();
            applied._argumentsConfig[name] = tmpArgument;
            applied._argumentsOrder.push(name);
        } else {
            tmpArgument = applied._argumentsConfig[name];
        }

        applied._currentArgument = tmpArgument;

        return applied;
    };

    applied.number = chainer('typer/number', 'setTyper', applied);
    applied.string = chainer('typer/string', 'setTyper', applied);
    applied.object = chainer('typer/object', 'setTyper', applied);
    applied.bool = chainer('typer/bool', 'setTyper', applied);
    applied.func = chainer('typer/func', 'setTyper', applied);

    applied.default = function(defaultValue) {
        applied._currentArgument.setDefault(defaultValue);

        return applied;
    };

    return applied;
}

module.exports = argumentor;