	//keeps track of universal progression pace -- how points are gained depends on the skill
var levelUpPoints = {};

levelUpPoints[0] = 0;
levelUpPoints[1] = 5;
levelUpPoints[2] = 15;
levelUpPoints[3] = 50;

/**
 * @name levelOf
 * @description returns the level of a skill given its value in terms of points
 * @param {number} skill - the skill to check the level of
 * @returns returns the level of a skill given its value in terms of points
 */
function levelOf(skill) {
	//increments through the levels until it goes too far 
	var levelCounter = 0;
	while (skill >= levelUpPoints[levelCounter])
		levelCounter++;
	
	return levelCounter;
}

/**
 * @name pointsAtLevel
 * @description returns the points required to level up to a certain level
 * @param {number} level - the level to check
 * @returns returns the points required to level up to a certain level
 */
function pointsAtLevel(level) {
	return levelUpPoints[level];
}