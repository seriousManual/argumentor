function sanitize(actualArguments, argumentsConfiguration, argumentsOrder) {
    actualArguments = defaults(actualArguments, argumentsConfiguration, argumentsOrder);

    return types(actualArguments, argumentsConfiguration, argumentsOrder);
}

function defaults(actualArguments, argumentsConfiguration, argumentsOrder) {
    argumentsOrder.forEach(function(argumentName, index) {
        var argumentDefault = argumentsConfiguration[argumentName].getDefault();

        if(actualArguments[index] === undefined && argumentDefault) {
            actualArguments[index] = argumentDefault;
        }
    });

    return actualArguments;
}

function types(actualArguments, argumentsConfiguration, argumentsOrder) {
    var result = [];

    actualArguments.forEach(function (argument, index) {
        var argumentName = argumentsOrder[index];
        var transformed;

        if (argumentName) {
            transformed = argumentsConfiguration[argumentName].invokeTyper(argument);
        } else {
            transformed = argument;
        }

        result[index] = transformed;
    });

    return result;
}

module.exports = sanitize;