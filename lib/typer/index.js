function load(name, applied) {
    return function () {
        applied._currentParameter.typer(require('./' + name));

        return applied;
    }
}

module.exports = load;