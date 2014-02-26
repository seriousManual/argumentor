function Parameter() {
    this._typer = null;
}

Parameter.prototype.typer = function(callable) {
    this._typer = callable;

    return this;
};

Parameter.prototype.invokeTyper = function(value) {
    return this._typer.call(null, value);
};

module.exports = Parameter;