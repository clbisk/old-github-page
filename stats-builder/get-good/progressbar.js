/*eslint-env jquery */

/**
 * @name Progressbar
 * @description progressbars are used to keep track of leveling and timed activities
 * @param data - the name of the data this progressbar is attached to
 * @param selector - a unique selector for the html element attached to this progressbar
 * @param value - current value of the progressbar
 * @param max - maximum possible value for progressbar
 */
function Progressbar( data, selector, value, max ) {
	this.data = data;
	this.selector = selector;
	this.max = max;
	this.value = value;
	this.level = 0;
}

/**
 * @name Progressbar.prototype.getMax
 * @function
 * @returns current max
 */
Progressbar.prototype.getMax = function() {
	return this.max;
};

/**
 * @name Progressbar.prototype.setMax
 * @function
 * @param newMax
 */
Progressbar.prototype.setMax = function( newMax ) {
	this.max = newMax;
};

/**
 * @name Progressbar.prototype.getValue
 * @function
 * @returns current value
 */
Progressbar.prototype.getValue = function() {
	return this.value;
};

/**
 * @name Progressbar.prototype.setValue
 * @function
 * @param newValue
 */
Progressbar.prototype.setValue = function( newValue ) {
	this.value = newValue;
};

/**
 * @name Progressbar.prototype.levelUp
 * @description increases the level of a progressbar by one
 * @function
 */
Progressbar.prototype.levelUp = function () {
	this.level++;
	
	var levelLabel =  $("#hidableSkillsBar ." + this.data + " .level-label");
	levelLabel.html("level " + this.level);
	
	var duration;
	if (this.level < 1)
		duration = 'slow';
	else if (this.level < 2)
		duration = 'medium';
	else
		duration = 'fast';
	
	$(this.selector).children().animate({width: this.max}, {duration: duration});
};

/**
 * @name Progressbar.prototype.levelTo
 * @description sets the level of a progressbar to a specific value
 * @function
 * @param newLevel - value of level progressbar will be set to
 */
Progressbar.prototype.levelTo = function( newLevel ) {
	this.level = newLevel;
	
	var levelLabel =  $("#hidableSkillsBar ." + this.data + " .level-label");
	levelLabel.html("level " + this.level);
	
	var duration;
	if (this.level < 1)
		duration = 'slow';
	else if (this.level < 2)
		duration = 'medium';
	else
		duration = 'fast';
	
	$(this.selector).children().animate({width: this.max}, {duration: duration});
};

/**
 * @name fillProgressbar
 * @description fills progressbar from left to right over time
 * @param you
 * @param skillObj - skill object with name and amount corresponding to progressbar to be filled
 */
Progressbar.prototype.fillProgressbar = function( you, skillObj ) {
	var skillName = skillObj.skillName;
	var thisProgressbar = $("#skills #" + skillName + "Progressbar");
	var progressbarObject = thisProgressbar.data(skillName + "Progressbar");
	
	var curPoints = you[skillName];
	var curLevel = levelOf(you[skillName]);

	//points between previous level and next level
	var pointsOverPrevLevel = curPoints - pointsAtLevel(curLevel);
	//points needed to get next level (max for the progressbar)
	var pointsToNextLevel = pointsAtLevel(curLevel+1) - pointsAtLevel(curLevel);
	
	var maxWidth = thisProgressbar.width();
	var calculatedWidth = (pointsOverPrevLevel / pointsToNextLevel) * maxWidth;
	
	var label =  $("#hidableSkillsBar ." + skillName + " .progressbar-label");
	label.html(skillName + " " + pointsOverPrevLevel + "/" + pointsToNextLevel);

	var duration;
	if (curLevel < 1)
		duration = 'slow';
	else if (curLevel < 2)
		duration = 'medium';
	else
		duration = 'fast';
	
	//if a new level was just reached, needs to show bar being filled before resetting
	if (pointsOverPrevLevel === 0 || progressbarObject.level !== curLevel) {
		progressbarObject.levelUp();
	}
	
	thisProgressbar.children().animate({width: calculatedWidth}, {duration: duration});
	progressbarObject.setValue(curPoints);
};