/*eslint-env jquery */

/**
 * @name actionsOnScreen
 * @description array holding all of the actions that are currently clickable
 */
var actionsOnScreen = [];

/**
 * @name updateUI
 * @description adds actions that have been unlocked when unlocked and removes redundant actions when they are redundant
 * @function
 * @param you - keeps track of you
 */
function updateUI(you) {
	for (var action of actions) {
		if (action instanceof Action) {
			//add anything that has add requirement satisfied
			if (eval(action.unlockReq)) {
				//if not already found
				if (!$("#" + action.name.replace(/\s/g, '')).length) {
					actionsOnScreen.push(action);
					
					var nameID = action.name.replace(/\s/g, '');
					$("#actions").append(`
						<button id='` + nameID + `'>` + action.name + `</button>
					`);
					$("#" + nameID).button();
					$("#" + nameID).on("click", {you: you, action: action}, doAction);
					
					console.log("didn't find " + action.name + ", added " + action.name);
				}
			}
		} else
			console.error("Uh oh! There was a non-Action in the action list");
	}
	
	for (var actionOnScreen of actionsOnScreen) {
		//remove anything that has remove requirement satisfied
		if (eval(actionOnScreen.removeReq)) {
			removeAction(actionOnScreen);
		}
	}
}

/**
 * @name removeAction
 * @description removes a clickable action from the UI when redundant
 * @param you
 * @param action - action to be removed
 */
function removeAction( action ) {
	console.log("removing " + action.name);
	$("#" + action.name).remove();
	
	var loc = actionsOnScreen.indexOf(action);
	actionsOnScreen.splice(loc, 1);
}

function fillProgressbar( you, statUp ) {
	var skill = statUp.split("+")[0];
	
	//build skills display, if necessary
	if (!you.hasSkills) {
		firstSkill(you, skill);
	}
	
	//add a new progressbar, if necessary
	else if (!$("#hidableSkillsBar ." + skill + " .ui-progressbar").length) {
		newSkill(you, skill);
	}
	
	var points = you[skill];
	var level = levelOf(you[skill]);
	var thisProgressbar = $("#skills #" + skill + "Progressbar");

	//points over previously attained level
	var value = points - pointsAtLevel(level);
	//points needed to get next level
	var thisMaxValue = pointsAtLevel(level+1) - pointsAtLevel(level);
	
	var levelingUp = false;
	//if a new level was just reached, needs to show bar being filled before resetting
	if (value === 0) {
		levelingUp = true;
		var nextMaxValue = thisMaxValue;
		thisMaxValue = pointsAtLevel(level) - pointsAtLevel(level-1);
		value = pointsAtLevel(level) - pointsAtLevel(level-1);
	}
	
	var maxWidth = thisProgressbar.width();
	var calculatedWidth = (value / thisMaxValue) * maxWidth;
	
	var label =  $("#hidableSkillsBar ." + skill + " .progressbar-label");
	label.html(skill + " " + value + "/" + thisMaxValue);

	var duration;
	if (level < 1)
		duration = 'slow';
	else if (level < 2)
		duration = 'medium';
	else
		duration = 'fast';
	
	//TODO: fix when the new progressbars get all confused
	thisProgressbar.children().animate({width: calculatedWidth}, {duration: duration}).promise().done(function() {
		//make sure the animation is done before so it doesn't reverse the order and get all jumpy
		thisProgressbar.progressbar("value", value);
	}).promise().done(function() {
		if (levelingUp) {
			thisProgressbar.remove();
			$("#hidableSkillsBar ." + skill).append(`
					<div id="` + skill + `Progressbar" class='progressbar'></div>
			`);
			
			$("#skills #" + skill + "Progressbar").progressbar({
				max: nextMaxValue,
				value: 0.000000001
			});
			
			you.uiConsole.add("You leveled up " + skill + "!");
			
			label.html(skill + " " + 0 + "/" + nextMaxValue);
			var levelLabel =  $("#hidableSkillsBar ." + skill + " .level-label");
			levelLabel.html("level " + level);
		}
	});
}

/**
 * @name firstSkill
 * @description adds the skill box when you do your first ever action
 * @function
 * @param skill - the skill to add a progressbar for
 */
function firstSkill( you, skill ) {
	you.hasSkills = true;
	
	$(document.body).append(`
		<div id="skills">
			<div id="handle"> 
				<div id="skillsOpenCloseTab">skills</div>
			</div>
			<div id="hidableSkillsBar">
				<div class="` + skill + `">
					<div class='progressbar-label'>` + skill + ` (` + you[skill] + `/5)</div>
					<div class='level-label'></div>
					<div id="` + skill + `Progressbar" class='progressbar'></div>
				</div>
			</div>
		</div>
	`);
	
	$("#skills .progressbar").progressbar({
		max: 5,
		value: 0.00000001
	});
	//TODO: make hidableSkillsBar hidable
}

/**
 * @name newSkill
 * @description adds a new progressbar to the skills tab for a new skill discovered
 * @function
 * @param skill - the skill to add a progressbar for
 */
function newSkill( you, skill ) {
	$("#hidableSkillsBar").append(`
		<div class="` + skill + `">
			<div class='progressbar-label'>` + skill + ` (` + you[skill] + `/5)</div>
			<div class='level-label'></div>
			<div id="` + skill + `Progressbar" class='progressbar'></div> 
		</div>
	`);
	
	//skill.replace(/\s/g, '')
	
	$("#skills #" + skill + "Progressbar").progressbar({
		max: 5,
		value: 0.000000001
	});
}

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