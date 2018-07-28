/**
 * @name Progressbar
 * @description progressbars are used to keep track of leveling and timed activities
 * @param skill - the skill this progressbar is attached to
 * @param value
 * @param max
 */
function Progressbar(skill, value, max) {
	this.skill = skill;
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