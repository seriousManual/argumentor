var errors = require('./lib/errors');
var chainer = require('./lib/chainer');

var sanitize = require('./lib/sanitize');
var Parameter = require('./lib/Parameter');

function argumentor(client, thisValue) {
    function applied() {
        var parameters = Array.prototype.slice.call(arguments, 0);
        var sanitizedParameters = sanitize(parameters, applied._parameterConfig);

        return client.apply(thisValue || null, sanitizedParameters);
    }

    applied._currentParameter = null;
    applied._parameterConfig = {};

    applied.p = function (name) {
        if (!name) throw new errors.ParameterError('parameter name missing');

        var tmpParameter;
        if (!applied._parameterConfig[name]) {
            tmpParameter = new Parameter();
            applied._parameterConfig[name] = tmpParameter;
        } else {
            tmpParameter = applied._parameterConfig[name];
        }

        applied._currentParameter = tmpParameter;

        return applied;
    };

    applied.number = chainer('typer/number', 'typer', applied);
    applied.string = chainer('typer/string', 'typer', applied);
    applied.object = chainer('typer/object', 'typer', applied);
    applied.bool = chainer('typer/bool', 'typer', applied);
    applied.func = chainer('typer/func', 'typer', applied);

    return applied;
}

module.exports = argumentor;