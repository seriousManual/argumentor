function Parameter() {
    this._converter = null;
}

Parameter.prototype.converter = function(callable) {
    this._converter = callable;
};

module.exports = Parameter;