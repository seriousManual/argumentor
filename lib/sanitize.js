function sanitize(parameters, parametersConfiguration) {
    var parametersNames = Object.keys(parametersConfiguration);

    parameters.forEach(function(parameter, index) {
        var parameterName = parametersNames[index];
        var transformed;

        if(parameterName) {
            transformed = parametersConfiguration[parameterName].invokeTyper(parameter);
        } else {
            transformed = parameter;
        }

        parameters[index] = transformed;
    });

    return parameters;
}

module.exports = sanitize;