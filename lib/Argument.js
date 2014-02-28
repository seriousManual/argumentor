function Argument() {
    this._default = undefined;
    this._typer = Argument.NOOP_TYPER;
}

Argument.NOOP_TYPER = function(value) {
    return value;
};

Argument.prototype.setTyper = function (callable) {
    this._typer = callable;

    return this;
};

Argument.prototype.setDefault = function (defaultValue) {
    this._default = defaultValue;

    return this;
};

Argument.prototype.invokeTyper = function (value) {
    return this._typer.call(null, value);
};

Argument.prototype.getDefault = function () {
    return this._default;
};

module.exports = Argument;