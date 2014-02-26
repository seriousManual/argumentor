function sanitize(parameters, parametersConfiguration) {
    var parametersNames = Object.keys(parametersConfiguration);

    parameters.forEach(function(parameter, index) {
        parameters[index] = parametersConfiguration[parametersNames[index]].invokeTyper(parameter);
    });

    return parameters;
}

module.exports = sanitize;