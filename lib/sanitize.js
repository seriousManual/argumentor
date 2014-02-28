function sanitize(actualArguments, argumentsConfiguration) {
    actualArguments = defaults(actualArguments, argumentsConfiguration);

    return types(actualArguments, argumentsConfiguration);
}

function defaults(actualArguments, argumentsConfiguration) {
    var argumentsNames = Object.keys(argumentsConfiguration);

    argumentsNames.forEach(function(argumentName, index) {
        var argumentDefault = argumentsConfiguration[argumentName].getDefault();

        if(actualArguments[index] === undefined && argumentDefault) {
            actualArguments[index] = argumentDefault;
        }
    });

    return actualArguments;
}

function types(actualArguments, argumentsConfiguration) {
    var argumentsNames = Object.keys(argumentsConfiguration);
    var result = [];

    actualArguments.forEach(function (argument, index) {
        var argumentName = argumentsNames[index];
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