var errors = require('./errors');

function sanitize(actualArguments, argumentsConfiguration, argumentsOrder, combinations) {
    actualArguments = resolveCombinations(actualArguments, argumentsOrder, combinations);
    actualArguments = resolveDefaults(actualArguments, argumentsConfiguration, argumentsOrder);

    return types(actualArguments, argumentsConfiguration, argumentsOrder);
}

function resolveCombinations(actualArguments, argumentsOrder, combinations) {
    if (!combinations || combinations.length === 0) return actualArguments;

    var chosenCombination = null;
    for (var i = 0; i < combinations.length; i++) {
        var possibleCombination = combinations[i];

        if (possibleCombination.length === actualArguments.length) {
            chosenCombination = possibleCombination;
            break;
        }
    }

    if (!chosenCombination) {
        throw new errors.ArgumentError('no matching combination found');
    }

    var result = _initializeArray(argumentsOrder.length);

    chosenCombination.forEach(function (argument, index) {
        var possibleIndex = argumentsOrder.indexOf(argument);

        result[possibleIndex] = actualArguments[index];
    });

    return result;
}

function resolveDefaults(actualArguments, argumentsConfiguration, argumentsOrder) {
    argumentsOrder.forEach(function (argumentName, index) {
        if(actualArguments[index] !== undefined) return;

        var argumentDefault = argumentsConfiguration[argumentName].getDefault();

        if (argumentDefault) {
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

function _initializeArray(count, value) {
    var result = [];

    for (var i = 0; i < count; i++) {
        result.push(value);
    }

    return result;
}

module.exports = sanitize;