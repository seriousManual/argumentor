var Parameter = require('./lib/Parameter');
var typer = require('./lib/typer');
var errors = require('./lib/errors');
var sanitize = require('./lib/sanitize');

function argumentor(client, thisValue) {
    function applied() {
        var parameters = Array.prototype.slice.call(arguments, 0);
        var sanitizedParameters = sanitize(parameters, applied._parameterConfig);

        return client.apply(thisValue || null, sanitizedParameters);
    }

    applied._currentParameter = null;
    applied._parameterConfig = {};

    applied.p = function (name) {
        if(!name) throw new errors.ParameterError('parameter name missing');

        var tmpParameter = new Parameter();

        applied._currentParameter = tmpParameter;
        applied._parameterConfig[name] = tmpParameter;

        return applied;
    };

    applied.number = typer('number').bind(applied);
    applied.string = typer('string').bind(applied);
    applied.object = typer('object').bind(applied);
    applied.bool = typer('bool').bind(applied);
    applied.func = typer('func').bind(applied);

    return applied;
}

module.exports = argumentor;