/*eslint-env jquery */

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
				if (!$("#" + action.name.replace(/\s/g, '')).length) {
					var nameID = action.name.replace(/\s/g, '');
					$("#actions").append(`
						<button id='` + nameID + `'>` + action.name + `</button>
					`);
					$("#" + nameID).button();
					$("#" + nameID).on("click", {you: you, action: action}, doAction);
					
					console.log("didn't find " + action.name + ", added " + action.name);
				}
			}
			
			//remove anything that has remove requirement satisfied
			if (eval(action.removeReq)) {
				removeAction(action);
			}

		} else {
			console.error("Uh oh! There was a non-Action in the action list");
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
	console.log("trying to remove " + action.name + " at " + $("." + action.name));
	$("#" + action.name).remove();
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
	
	var value = you[skill];
	var thisProgressbar = $("#skills #" + skill + "Progressbar");

	var thisMaxValue = thisProgressbar.progressbar("option", "max");
	if(thisMaxValue === null) {
		//this is not a progressbar
		console.error(thisProgressbar + " isn't a progressbarrrrrr");
	}
	var maxWidth = thisProgressbar.width();
	var calculatedWidth = (value / thisMaxValue) * maxWidth;
	
	//TODO: fix when the new progressbars get all confused
	thisProgressbar.children().animate({width: calculatedWidth}, {duration: 'slow'}).promise().done(function() {
		//make sure the animation is done before so it doesn't reverse the order and get all jumpy
		thisProgressbar.progressbar("value", value);
	});
	
	var label =  $("#hidableSkillsBar ." + skill + " .progressbar-label");
	var labelText = label.html();
	//where our label number starts
	var labelNumberPos = labelText.lastIndexOf(" ") + 1;
	
	label.html(labelText.substring(0, labelNumberPos) + value + "/" + thisMaxValue);
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