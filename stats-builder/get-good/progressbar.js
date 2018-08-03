/*eslint-env jquery */

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
	
	var isLevelingUp = false;
	//if a new level was just reached, needs to show bar being filled before resetting
	if (pointsOverPrevLevel === 0) {
		isLevelingUp = true;
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
	
	thisProgressbar.children().animate({width: calculatedWidth}, {duration: duration});
	thisProgressbar.data(skillName).setValue(curPoints);
	if (isLevelingUp) {
		you.uiConsole.add("You leveled up " + skillName + "!");
		
		label.html(skillName + " " + 0 + "/" + pointsToNextLevel);
		var levelLabel =  $("#hidableSkillsBar ." + skillName + " .level-label");
		levelLabel.html("level " + curLevel);
	}
};