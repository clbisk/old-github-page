/**
 * @name Progressbar
 * @description progressbars are used to keep track of leveling and timed activities
 */
function Progressbar(tag, value, max) {
	this.identifier = tag;
	this.max = max;
	this.value = value;
}

Progressbar.prototype.max = function (newMax) {
	this.max = newMax;
};

Progressbar.prototype.value = function (newValue) {
	this.value = newValue;
};