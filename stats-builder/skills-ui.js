/*eslint-env jquery */

function fillProgressbar( you, statUp ) {
	var skill = statUp.split("+")[0];
	var amount = statUp.split("=")[1];
	
	//build skills display, if necessary
	if (!you.hasSkills) {
		firstSkill(you, skill);
	}
	
	//add a new progressbar, if necessary
	else if (! $("#hidableSkillsBar ." + skill).length) {
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
	
	//TODO: make sure the skill bar goes all the way from left to right
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
	
	$("#skills .progressbar").progressbar({
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