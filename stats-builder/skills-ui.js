/*eslint-env jquery */

/**
 * @name SkillsUI
 * @description works most of the ui
 * @param you
 * @param actions
 * @param actionsOnScreen
 * @param progressbars
 */
function SkillsUI (you, actions, actionsOnScreen, progressbars) {
	this.watching = you;
	this.possible = actions;
	this.canAction = actionsOnScreen;
	this.progressbars = progressbars;
}

/**
 * @name updateUI
 * @description adds actions that have been unlocked when unlocked and removes redundant actions when they are redundant
 * @function
 * @param you - keeps track of you
 * @param actions - keeps track of all possible actions
 * @param actionsOnScreen - keeps track of currently clickable actions
 */
SkillsUI.prototype.updateUI = function(you, actions, actionsOnScreen) {
	for (var action of actions) {
		//add anything that has add requirement satisfied
		if (eval(action.unlockReq.field) === action.unlockReq.value) {
			//if not already found
			if (!$("#" + action.name.replace(/\s/g, '')).length) {
				actionsOnScreen.push(action);
				
				var nameID = action.name.replace(/\s/g, '');
				$("#actions").append(`
					<button id='` + nameID + `'>` + action.name + `</button>
				`);
				
				$("#" + nameID).button();
				$("#" + nameID).on("click", {you: you, skillsUI: this, action: action, actions: actions, actionsOnScreen: actionsOnScreen}, doAction);
				
				you.uiConsole.add("You learned how to " + action.name + ".");
				
				$("#" + nameID).effect("highlight", "slow");
			}
		}
	}
	
	for (var actionOnScreen of actionsOnScreen) {
		//remove anything that has remove requirement satisfied
		if (actionOnScreen.removeReq) {	//not all actions have a removeReq (yet)
			if (eval(actionOnScreen.removeReq.field) ===  actionOnScreen.removeReq.value) {
				this.removeAction(actionOnScreen, actionsOnScreen);
			}
		}
	}
	
	$("#sidebar #stats").html("time: " + you.time);
};

/**
 * @name fillProgressbar
 * @description fills progressbar from left to right over time
 * @param you
 * @param skillObj - skill object with name and amount corresponding to progressbar to be filled
 */
SkillsUI.prototype.fillProgressbar = function( you, skillObj ) {
	var skillName = skillObj.skillName;
	
	//build skills display, if necessary
	if (!you.hasSkills) {
		this.firstSkill(you, skillObj);
	}
	
	//add a new progressbar, if necessary
	else if (!$("#hidableSkillsBar ." + skillName).length) {
		this.newSkill(you, skillObj);
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
		var nextMaxValue = pointsToNextLevel;
		pointsToNextLevel = pointsAtLevel(curLevel) - pointsAtLevel(curLevel-1);
		pointsOverPrevLevel = pointsAtLevel(curLevel) - pointsAtLevel(curLevel-1);
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
		
		label.html(skillName + " " + 0 + "/" + nextMaxValue);
		var levelLabel =  $("#hidableSkillsBar ." + skillName + " .level-label");
		levelLabel.html("level " + curLevel);
	}
};

/**
 * @name firstSkill
 * @description adds the skill box when you do your first ever action
 * @function
 * @param skillUp - the skill object to add a progressbar for
 */
SkillsUI.prototype.firstSkill = function( you, skillUp ) {
	you.hasSkills = true;
	
	var skillName = skillUp.skillName;
	$(document.body).append(`
		<div id="skills">
			<div id="handle"> 
				<div id="skillsOpenCloseTab">skills</div>
			</div>
			<div id="hidableSkillsBar">
				<div class="` + skillName + `">
					<div class='progressbar-label'>` + skillName + ` (` + you[skillName] + `/5)</div>
					<div class='level-label'></div>
					<div id="` + skillName + `Progressbar" class='progressbar'>
						<div id="` + skillName + `ProgressbarValue"></div>
					</div>
				</div>
			</div>
		</div>
	`);

	var newProgressbar = new Progressbar(skillName, 0, 5);
	//associates the newly made progressbar with the physical div
	$("#skills #" + skillName + "Progressbar").data(skillName, newProgressbar);
	//stores the newly made progressbar
	this.progressbars.push(newProgressbar);
};

/**
 * @name newSkill
 * @description adds a new progressbar to the skills tab for a new skill discovered
 * @function
 * @param skill - the skill object to add a progressbar for
 */
SkillsUI.prototype.newSkill = function( you, skill ) {
	var skillName = skill.skillName;
	$("#hidableSkillsBar").append(`
		<div class="` + skillName + `">
			<div class='progressbar-label'>` + skillName + ` (` + you[skillName] + `/5)</div>
			<div class='level-label'></div>
			<div id="` + skillName + `Progressbar" class='progressbar'>
				<div id="` + skillName + `ProgressbarValue"></div>
			</div> 
		</div>
	`);
	
	var newProgressbar = new Progressbar(skillName, 0, 5);
	//associates the newly made progressbar with the physical div
	$("#skills #" + skillName + "Progressbar").data(skillName, newProgressbar);
	//stores the newly made progressbar
	this.progressbars.push(newProgressbar);
};

/**
 * @name removeAction
 * @description removes a clickable action from the UI when redundant
 * @param you
 * @param action - action to be removed
 * @param actionsOnScreen - all the actions on the screen atm
 */
SkillsUI.prototype.removeAction = function( action, actionsOnScreen ) {
	console.log("removing " + action.name);
	$("#" + action.name).effect("fade", "slow").promise().done(function() {
		$("#" + action.name).remove();
	});
	
	var loc = actionsOnScreen.indexOf(action);
	actionsOnScreen.splice(loc, 1);
};

//TODO: make hidableSkillsBar hidable

/**
 * @name fillProgressbarClassic
 * @description old way to fill an outlined rectangle from left to right over time
 * @param id - the progressbar's id
 * @param value - the value to fill up to
 */
function fillProgressbarClassic( id, value, label ) {
	var thisProgressbar = $("#" + id);
	
	var thisMaxValue = thisProgressbar.progressbar("option", "max");
	if(thisMaxValue === null) {
		//this is not a progressbar
		console.error("This isn't a progressbarrrrrr");
	}
	var maxWidth = thisProgressbar.width();
	var calculatedWidth = (value / thisMaxValue) * maxWidth;
	
	//TODO: fix when the new progressbars get all confused
	thisProgressbar.children().animate({width: calculatedWidth}, {duration: 'slow'}).promise().done(function() {
		//make sure the animation is done before so it doesn't reverse the order and get all jumpy
		thisProgressbar.progressbar("value", value);
	});
	
	if (label !== null) {
		var labelText = label.html();
		//where our label number starts
		var labelNumberPos = labelText.lastIndexOf(" ") + 1;
		
		label.html(labelText.substring(0, labelNumberPos) + value + "/" + thisMaxValue);
	}
}