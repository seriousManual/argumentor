function Parameter() {
    this._typer = null;
}

Parameter.prototype.typer = function(callable) {
    this._typer = callable;
};

module.exports = Parameter;