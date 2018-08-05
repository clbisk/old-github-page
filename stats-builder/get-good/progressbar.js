/*eslint-env jquery */

/**
 * @name Progressbar
 * @description progressbars are used to keep track of leveling and timed activities
 * @param data - the name of the data this progressbar is attached to
 * @param selector - a unique selector for the html element attached to this progressbar
 * @param value - current value of the progressbar
 * @param max - maximum possible value for progressbar
 * @param hasLevels - certain progressbars will reset after leveling, but others don't have this behavior
 * @param hasLabel - determines whether the progressbar will have to change a label when values change
 */
function Progressbar( you, data, selector, value, max, hasLevels, hasLabel ) {
	this.watching = you;
	this.data = data;
	this.selector = selector;
	this.max = max;
	this.value = value;
	this.hasLevels = hasLevels;
	if (hasLevels)
		this.level = 0;
	this.hasLabel = hasLabel;
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
	
	var dataName = this.data;
	var thisProgressbarElement = $(this.selector);	
	var curPoints = this.value;
	var maxWidth = thisProgressbarElement.width();
	var calculatedWidth;
	if (this.hasLabel)
		var label =  $("#" + dataName + "ProgressbarLabel");

	if (this.hasLevels) {
		var curLevel = levelOf(this.watching[dataName]);
		
		//points between previous level and next level
		var pointsOverPrevLevel = curPoints - pointsAtLevel(curLevel);
		//points needed to get next level (max for the progressbar)
		var pointsToNextLevel = pointsAtLevel(curLevel+1) - pointsAtLevel(curLevel);
		calculatedWidth = (pointsOverPrevLevel / pointsToNextLevel) * maxWidth;
		
		if (this.hasLabel) {
			label.html(dataName + " " + pointsOverPrevLevel + "/" + pointsToNextLevel);
		}
		
		var duration;
		if (curLevel < 1)
			duration = 'slow';
		else if (curLevel < 2)
			duration = 'medium';
		else
			duration = 'fast';
		
		//if a new level was just reached, needs to show bar being filled before resetting
		if (pointsOverPrevLevel === 0 || this.level !== curLevel) {
			this.levelUp();
		}
		
		thisProgressbarElement.children().animate({width: calculatedWidth}, {duration: duration});
	} else {
		calculatedWidth = (curPoints / this.max) * maxWidth;
		
		if (this.hasLabel) {
			label.html(dataName + " " + curPoints + "/" + this.max);
		}
		
		thisProgressbarElement.children().animate({width: calculatedWidth}, 'fast');
	}
};

/**
 * @name Progressbar.prototype.incValue
 * @description increases the value of a progressbar by some number
 * @function
 * @param amountUp - number to increase progressbar by
 */
Progressbar.prototype.incValue = function( amountUp ) {
	this.value += amountUp;
	
	var dataName = this.data;
	var thisProgressbarElement = $(this.selector);	
	var curPoints = this.value;
	var maxWidth = thisProgressbarElement.width();
	var calculatedWidth;
	if (this.hasLabel)
		var label =  $("#" + dataName + "ProgressbarLabel");

	if (this.hasLevels) {
		var curLevel = levelOf(this.watching[dataName]);
		
		//points between previous level and next level
		var pointsOverPrevLevel = curPoints - pointsAtLevel(curLevel);
		//points needed to get next level (max for the progressbar)
		var pointsToNextLevel = pointsAtLevel(curLevel+1) - pointsAtLevel(curLevel);
		calculatedWidth = (pointsOverPrevLevel / pointsToNextLevel) * maxWidth;
		
		if (this.hasLabel) {
			label.html(dataName + " " + pointsOverPrevLevel + "/" + pointsToNextLevel);
		}
		
		var duration;
		if (curLevel < 1)
			duration = 'slow';
		else if (curLevel < 2)
			duration = 'medium';
		else
			duration = 'fast';
		
		//if a new level was just reached, needs to show bar being filled before resetting
		if (pointsOverPrevLevel === 0 || this.level !== curLevel) {
			this.levelUp();
		}
		
		thisProgressbarElement.children().animate({width: calculatedWidth}, {duration: duration});
	} else {
		calculatedWidth = (curPoints / this.max) * maxWidth;
		
		if (this.hasLabel) {
			label.html(dataName + " " + curPoints + "/" + this.max);
		}
		
		thisProgressbarElement.children().animate({width: calculatedWidth}, 'fast');
	}
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
	
	var maxWidth = $(this.selector).width();
	
	var duration;
	if (this.level < 1)
		duration = 'slow';
	else if (this.level < 2)
		duration = 'medium';
	else
		duration = 'fast';
	
	$(this.selector).children().animate({width: maxWidth}, {duration: duration});
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
	
	var maxWidth = $(this.selector).width();
	
	var duration;
	if (this.level < 1)
		duration = 'slow';
	else if (this.level < 2)
		duration = 'medium';
	else
		duration = 'fast';
	
	$(this.selector).children().animate({width: maxWidth}, {duration: duration});
};

/**
 * @name fillProgressbar
 * @description fills progressbar from left to right over time
 * @param you
 * @param skillObj - skill object with name and amount corresponding to progressbar to be filled
 */
Progressbar.prototype.fillProgressbar = function( you, skillObj ) {
	
};