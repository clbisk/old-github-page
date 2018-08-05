/*eslint-env jquery */

/**
 * @name SkillsUI
 * @description works most of the ui
 * @param you
 * @param actions
 * @param actionsOnScreen
 * @param progressbars
 */
function SkillsUI (you, actions, actionsOnScreen) {
	this.watching = you;
	this.possible = actions;
	this.canAction = actionsOnScreen;
}

/**
 * @name updateUI
 * @description adds actions that have been unlocked when unlocked and removes redundant actions when they are redundant
 * @function
 * @param you - keeps track of you
 * @param actions - keeps track of all possible actions
 * @param actionsOnScreen - keeps track of currently clickable actions
 */
SkillsUI.prototype.updateUI = function(actions, actionsOnScreen) {
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
				$("#" + nameID).data(action);
				$("#" + nameID).on("click", {you: this.watching, skillsUI: this, action: action, actions: actions, actionsOnScreen: actionsOnScreen}, doAction);
				$("#" + nameID).on("mouseenter", {you: this.watching, action: action, caller: "#" + nameID}, this.showSkillStats);
				$("#" + nameID).on("mouseleave", {action: action}, this.hideSkillStats);
				
				this.watching.uiConsole.add("You learned how to " + action.name + ".");
				
				$("#" + nameID).effect("highlight", "slow");
			}
		}
	}
	
	for (var actionOnScreen of actionsOnScreen) {
		//remove anything that has remove requirement satisfied
		if (actionOnScreen.removeReq) {	//not all actions have a removeReq (yet)
			if (eval(actionOnScreen.removeReq.field) === actionOnScreen.removeReq.value) {
				this.removeAction(actionOnScreen, actionsOnScreen);
			}
		}
	}
	
	$("#sidebar #stats").html("time: " + this.watching.time);
};

SkillsUI.prototype.showSkillStats = function( event ) {
	var you = event.data.you;
	var uniqueID = event.data.action.name.replace(/\s/g, '-') + "-skills-stat-box";
	var thisButton = $(event.data.caller)[0];
	var buttonCoordinates = thisButton.getBoundingClientRect();
	
	$("#actions").append(`
		<div class='skills-stat-box' id=` + uniqueID + `>
			<!--a new little box below and slightly to the right of this action button that shows the level of its corresponding skill-->
		</div>
	`);
	
	$("#" + uniqueID).css("left", buttonCoordinates.left);
	
	for (var skill in event.data.action.skills) {
		if (event.data.action.skills.hasOwnProperty(skill)) {	//check it's not an inherited boi
			var skillName = event.data.action.skills[skill].skillName;
			if (you[skillName] === 0 || !you[skillName]) {
				$("#" + uniqueID).append(`
					<div>???: not learned</div>
				`);
			} else {
				$("#" + uniqueID).append(`
					<div>` + skillName + `: ` + levelOf(you[skillName]) + `</div>
				`);
			}
		}
	}
};

SkillsUI.prototype.hideSkillStats = function( event ) {
	var uniqueID = event.data.action.name.replace(/\s/g, '-') + "-skills-stat-box";
	$("#" + uniqueID).remove();
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
						<div id="` + skillName + `ProgressbarValue" class='progressbar-value'></div>
					</div>
				</div>
			</div>
		</div>
	`);

	var selector = $("#skills #" + skillName + "Progressbar");
	var newProgressbar = new Progressbar(skillName, selector, 0, 5);
	//associates the newly made progressbar with the physical div
	$(selector).data(skillName + "Progressbar", newProgressbar);
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
				<div id="` + skillName + `ProgressbarValue" class='progressbar-value'></div>
			</div> 
		</div>
	`);
	
	var selector = $("#skills #" + skillName + "Progressbar");
	var newProgressbar = new Progressbar(skillName, selector, 0, 5);
	//associates the newly made progressbar with the physical div
	$(selector).data(skillName + "Progressbar", newProgressbar);
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