/**
 * @name Progressbar
 * @description progressbars are used to keep track of leveling and timed activities
 * @param skillName - the name of the skill this progressbar is attached to
 * @param value
 * @param max
 */
function Progressbar(skillName, value, max) {
	this.skillName = skillName;
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