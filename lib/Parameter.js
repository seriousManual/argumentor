function Parameter() {
    this._default = undefined;
    this._typer = Parameter.NOOP_TYPER;
}

Parameter.NOOP_TYPER = function(value) {
    return value;
};

Parameter.prototype.setTyper = function (callable) {
    this._typer = callable;

    return this;
};

Parameter.prototype.setDefault = function (defaultValue) {
    this._default = defaultValue;

    return this;
};

Parameter.prototype.invokeTyper = function (value) {
    return this._typer.call(null, value);
};

Parameter.prototype.getDefault = function () {
    return this._default;
};

module.exports = Parameter;