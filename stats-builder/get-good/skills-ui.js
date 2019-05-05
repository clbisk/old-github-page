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
 * @param actions - keeps track of all possible actions
 * @param actionsOnScreen - keep track of the actions currently clickable
 * @param uiController - controls all ui elements
 * @param uiConsole - the console that will communicate with the user
 */
SkillsUI.prototype.updateUI = function(actions, actionsOnScreen, uiController, uiConsole) {
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
				//TODO: transmit UIController
				$("#" + nameID).on("click", {you: this.watching, uiController: this.uiController,  action: action}, this.uiController.doAction);
				$("#" + nameID).on("mouseenter", {you: this.watching, action: action, caller: "#" + nameID}, this.showSkillStats);
				$("#" + nameID).on("click", {you: this.watching, action: action}, this.refreshSkillStats);
				$("#" + nameID).on("mouseleave", {action: action}, this.hideSkillStats);
				
				uiConsole.add("You learned how to " + action.name + ".");
			
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
};

/**
 * @name SkillsUI.prototype.showSkillStats
 * @description shows a little box under the action button with levels of all corresponding skills
 * @function
 * @param event - passes along you and the action button that called this method
 */
SkillsUI.prototype.showSkillStats = function( event ) {
	var you = event.data.you;
	var uniqueID = event.data.action.name.replace(/\s/g, '-') + "-skills-stat-box";
	var thisButton = $(event.data.caller)[0];
	var buttonCoordinates = thisButton.getBoundingClientRect();
	
	$("#actions").append(`
		<div class='skills-stat-box' id=` + uniqueID + `></div>
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

/**
 * @name SkillsUI.prototype.hideSkillStats
 * @description hides the little levels box (called when the cursor leaves the button)
 * @function
 * @param event - holds the action button that calls this method
 */
SkillsUI.prototype.hideSkillStats = function( event ) {
	var uniqueID = event.data.action.name.replace(/\s/g, '-') + "-skills-stat-box";
	$("#" + uniqueID).remove();
};

/**
 * @name SkillsUI.prototype.refreshSkillStats
 * @description refreshes the little box under the action button with levels of all corresponding skills
 * @function
 * @param event - passes along you and the action button that called this method
 */
SkillsUI.prototype.refreshSkillStats = function( event ) {
	var you = event.data.you;
	var uniqueID = event.data.action.name.replace(/\s/g, '-') + "-skills-stat-box";
	
	$("#" + uniqueID).html("");
	
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
					<div id='` + skillName  + `ProgressbarLabel' class='progressbar-label'>` + skillName + ` (` + you[skillName] + `/5)</div>
					<div class='level-label'></div>
					<div id="` + skillName + `Progressbar" class='progressbar'>
						<div id="` + skillName + `ProgressbarValue" class='progressbar-value'></div>
					</div>
				</div>
			</div>
		</div>
	`);

	var selector = "#skills #" + skillName + "Progressbar";
	var newProgressbar = new Progressbar(you, skillName, selector, 0, 5, true, true);
	//associates the newly made progressbar with the physical div
	$(selector).data("Progressbar", newProgressbar);
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
			<div id='` + skillName  + `ProgressbarLabel' class='progressbar-label'>` + skillName + ` (` + you[skillName] + `/5)</div>
			<div class='level-label'></div>
			<div id="` + skillName + `Progressbar" class='progressbar'>
				<div id="` + skillName + `ProgressbarValue" class='progressbar-value'></div>
			</div> 
		</div>
	`);
	
	var selector = "#skills #" + skillName + "Progressbar";
	var newProgressbar = new Progressbar(you, skillName, selector, 0, 5, true, true);
	//associates the newly made progressbar with the physical div
	$(selector).data("Progressbar", newProgressbar);
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
	
	//also needs to remove skill box if present
	$("#" + action.name.replace(/\s/g, '-') + "-skills-stat-box").remove();
};

//TODO: make hidableSkillsBar hidable