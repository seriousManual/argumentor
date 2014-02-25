var Parameter = require('./lib/Parameter');
var sanitize = require('./lib/sanitize');
var errors = require('./lib/errors');

function f(client, thisValue) {
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

    applied.number = function () {
        applied._currentParameter.converter(function(value) {
            if(isNaN(value)) throw new errors.TypeError('value is not a number');

            return Number(value);
        });

        return applied;
    };

    applied.string = function () {
        applied._currentParameter.converter(function(value) {
            return value + '';
        });

        return applied;
    };

    applied.object = function() {
        applied._currentParameter.converter(function(value) {
            if(typeof value !== 'object') throw new errors.TypeError('value is not a object');

            return value;
        });

        return applied;
    };

    applied.bool = function () {
        applied._currentParameter.converter(function(value) {
            return !!value;
        });

        return applied;
    };

    applied.func = function() {
        applied._currentParameter.converter(function(value) {
            if(typeof value !== 'function') {
                throw new errors.TypeError('value is not a function');
            }

            return value;
        });
    };

    applied.default = function(defaultValue) {
        applied._currentParameter.default(defaultValue);

        return applied;
    };

    return applied;
}

module.exports = f;