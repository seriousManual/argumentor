function Argument() {
    this._typer = Argument.NOOP_TYPER;

    this._hasDefault = false;
    this._default = undefined;
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
    this._hasDefault = true;

    return this;
};

Argument.prototype.hasDefault = function() {
    return this._hasDefault;
};

Argument.prototype.invokeTyper = function (value) {
    return this._typer.call(null, value);
};

Argument.prototype.getDefault = function () {
    return this._default;
};

module.exports = Argument;