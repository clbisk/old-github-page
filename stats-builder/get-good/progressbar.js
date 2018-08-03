/**
 * @name Progressbar
 * @description progressbars are used to keep track of leveling and timed activities
 * @param data - the name of the data this progressbar is attached to
 * @param value
 * @param max
 */
function Progressbar(data, value, max) {
	this.data = data;
	this.max = max;
	this.value = value;
}

Progressbar.prototype.getMax = function() {
	return this.max;
};

Progressbar.prototype.setMax = function (newMax) {
	this.max = newMax;
};

Progressbar.prototype.getValue = function() {
	return this.value;
};

Progressbar.prototype.setValue = function (newValue) {
	this.value = newValue;
};