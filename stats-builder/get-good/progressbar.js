/*eslint-env jquery */

/**
 * @name Progressbar
 * @description progressbars are used to keep track of leveling and timed activities
 * @param data - the name of the data this progressbar is attached to
 * @param value - current value of the progressbar
 * @param max - maximum possible value for progressbar
 */
function Progressbar( data, value, max ) {
	this.data = data;
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
 * @name Progressbar.prototype.level
 * @description increases the level of a progressbar by one
 * @function
 */
Progressbar.prototype.level = function () {
	this.level++;
};

/**
 * @name Progressbar.prototype.levelTo
 * @description sets the level of a progressbar to a specific value
 * @function
 * @param newLevel - value of level progressbar will be set to
 */
Progressbar.prototype.levelTo = function( newLevel ) {
	this.level = newLevel;
};

/**
 * @name fillProgressbar
 * @description fills progressbar from left to right over time
 * @param you
 * @param skillObj - skill object with name and amount corresponding to progressbar to be filled
 */
Progressbar.prototype.fillProgressbar = function( you, skillObj ) {
	var skillName = skillObj.skillName;
	
	//build skills display, if necessary
	if (!you.hasSkills) {
		SkillsUI.prototype.firstSkill(you, skillObj);
	}
	
	//add a new progressbar, if necessary
	else if (!$("#hidableSkillsBar ." + skillName).length) {
		SkillsUI.prototype.newSkill(you, skillObj);
	}
	
	var curPoints = you[skillName];
	var curLevel = levelOf(you[skillName]);
	var thisProgressbar = $("#skills #" + skillName + "Progressbar");

	//points between previous level and next level
	var pointsOverPrevLevel = curPoints - pointsAtLevel(curLevel);
	//points needed to get next level (max for the progressbar)
	var pointsToNextLevel = pointsAtLevel(curLevel+1) - pointsAtLevel(curLevel);
	
	var levelingUp = false;
	//if a new level was just reached, needs to show bar being filled before resetting
	if (pointsOverPrevLevel === 0) {
		levelingUp = true;
	}
	
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
	
	if (levelingUp) {
		you.uiConsole.add("You leveled up " + skillName + "!");
		
		var levelLabel =  $("#hidableSkillsBar ." + skillName + " .level-label");
		levelLabel.html("level " + curLevel);
		
		thisProgressbar.children().animate({width: maxWidth}, {duration: duration});
	}
	thisProgressbar.children().animate({width: calculatedWidth}, {duration: duration});
	thisProgressbar.data(skillName).setValue(curPoints);
};