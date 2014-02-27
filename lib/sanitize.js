function sanitize(actualArguments, argumentsConfiguration) {
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