module.exports = function () {
    this._currentParameter.typer(function(value) {
        return !!value;
    });

    return this;
};