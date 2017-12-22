/*eslint-env jquery */

/**
 * @name actions
 * @description array holding all of the actions in the game
 */
var actions = [];

actions.push(
	new Action("poop", "t==0", "levelOf(poop)==1", "null", "poop+=1", "clean-=1")
);
//TODO: read from file

/**
 * @name action
 * @description creates a new action that might be unlocked
 * @param name - what this action is called in the ui
 * @param unlockReq - when this action should be unlocked
 * @param removeReq - when this action becomes redundant
 * @param buff - any temporary buff that might follow doing this action
 * @param skills - a list of skills to be improved/needs to be decremented
 */
function Action(name, unlockReq, removeReq, buff, ...skills) {
	this.removeReq = removeReq;
	this.unlockReq = unlockReq;
	this.name = name;
	this.buff = buff;
	this.skills = skills;
	for (var skill of this.skills) {
		console.log(skill);
	}
}

/**
 * @name updateUI
 * @description adds actions that have been unlocked when unlocked and removes redundant skills when they are redundant
 */
function updateUI() {
	for (const action of actions) {
		//make sure i is of type action
		if (action instanceof Action) {
			//add anything that has add requirement satisfied
			if (action.unlockReq) {
				if (!$("#" + action.name).length) {
					$("#actions").append(`
						<button id='` + action.name + `'>` + action.name + `</button>
					`);
					$("#" + action.name).button();
				}
			}
			
			//remove anything that has remove requirement satisfied
			if (action.removeReq)
				$("#actions").remove("#" + action.name);

		}
	}
}

/**
 * @name incSkill
 * @description description
 * @function
 * @param statUp
 * @returns returns
 */
function incSkill( statUp ) {
	
}

/**
 * @name firstSkill
 * @description adds the skill box when you do your first ever action
 * @function
 * @param skill - the skill to add a progressbar for
 */
function firstSkill( skill ) {
	this.hasSkills = true;
	
	//TODO: make sure the skill bar goes all the way from left to right
	$(document.body).append(`
		<div id="skills">
			<div id="handle">
				<div id="skillsOpenCloseTab">skills</div>
			</div>
			<div id="hidableSkillsBar">
				<div class="` + skill + `">
					<div class='progressbar-label'>` + skill + ` (` + this[skill] + `/5)</div>
					<div id="` + skill + `Progressbar" class='progressbar'></div>
				</div>
			</div>
		</div>
	`);
	
	$("#skills .progressbar").progressbar({
		max: 5,
		value: this[skill]
	});
	//TODO: make hidableSkillsBar hidable
}

/**
 * @name newSkill
 * @description adds a new progressbar to the skills tab for a new skill discovered
 * @function
 * @param skill - the skill to add a progressbar for
 */
function newSkill( skill ) {
	$("#hidableSkillsBar").append(`
		<div class="` + skill + `">
			<div class='progressbar-label'>` + skill + ` (` + this[skill] + `/5)</div>
			<div id="` + skill + `Progressbar" class='progressbar'></div>
		</div>
	`);
	
	$("#skills .progressbar").progressbar({
		max: 5,
		value: this[skill]
	});
}

/**
 * @name doAction
 * @description levels up a stat when you do the corresponding action
 * @function
 * @param doer - who does the action
 */
function doAction( doer ) {
	//TODO: when swtiching from one skill to another stuff gets weird
	var classes = $(this).attr("class");
	var statUp = classes.split(" ")[0];
	
	console.log("You practiced " + statUp);
	
	//build skills display, if necessary
	if (!this.hasSkills) {
		firstSkill(statUp);
	} else if (! $("#hidableSkillsBar ." + statUp).length) {
		newSkill(statUp);
	}
	
	//increment the skill
	this[statUp]++;
	fillProgressbar( statUp + "Progressbar", thisBoi[statUp], $("#hidableSkillsBar ." + statUp + " .progressbar-label"));
	//TODO: what happens when bar is filled
	
	//check that doer is a You
	if (doer instanceof You) {
		doer.incSkill(statUp);
		updateUI();
	} else {
		console.error(doer + " cannot do actions, " + doer + " is a " + Object.getPrototypeOf(doer));
	}
	
	//TODO: disable the button for a hot minute to simulate the action being performed, maybe disable others if multitasking not possible	
};