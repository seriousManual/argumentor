var errors = require('./lib/errors');
var chainer = require('./lib/chainer');

var sanitize = require('./lib/sanitize');
var Parameter = require('./lib/Parameter');

function argumentor(client, thisValue) {
    function applied() {
        var parameters = Array.prototype.slice.call(arguments, 0);
        var sanitizedParameters = sanitize(parameters, applied._parameterConfig, applied._parameterOrder);

        return client.apply(thisValue || null, sanitizedParameters);
    }

    applied._currentParameter = null;
    applied._parameterConfig = {};
    applied._parameterOrder = [];

    applied.p = function (name) {
        if (!name) throw new errors.ParameterError('parameter name missing');

        var tmpParameter;
        if (!applied._parameterConfig[name]) {
            tmpParameter = new Parameter();
            applied._parameterConfig[name] = tmpParameter;
            applied._parameterOrder.push(name);
        } else {
            tmpParameter = applied._parameterConfig[name];
        }

        applied._currentParameter = tmpParameter;

        return applied;
    };

    applied.number = chainer('typer/number', 'setTyper', applied);
    applied.string = chainer('typer/string', 'setTyper', applied);
    applied.object = chainer('typer/object', 'setTyper', applied);
    applied.bool = chainer('typer/bool', 'setTyper', applied);
    applied.func = chainer('typer/func', 'setTyper', applied);

    applied.default = function(defaultValue) {
        applied._currentParameter.setDefault(defaultValue);

        return applied;
    }

    return applied;
}

module.exports = argumentor;