/*eslint-env jquery */
/**
 * @name UIController
 * @description Prototype that keeps track of all the things on screen and updates them when necessary
 * @param you
 * @param UIConsole
 * @param needsUI
 * @param skillsUI
 * @param actions
 * @param actionsOnScreen
 */
function UIController(you, uiConsole, needsUI, skillsUI, actions, actionsOnScreen) {
	this.watching = you;
	this.uiConsole = uiConsole;
	this.skillsUI = skillsUI;
	this.needsUI = needsUI;
	this.actions = actions;
	this.actionsOnScreen = actionsOnScreen;
	
	uiConsole.uiController = this;
	needsUI.uiController = this;
	skillsUI.uiController = this;
	you.uiController = this;
	you.uiConsole = uiConsole;
	
	skillsUI.updateUI(actions, actionsOnScreen, this, uiConsole);
	needsUI.construct();
	uiConsole.construct();
	needsUI.updateUI();
	
	//when a button is clicked, update needs
	//$(".progressbar-button").on("click", this.updateUI);
}

UIController.prototype.needsClickResponse = function( event ) {
	var trigger = event.target;
	var triggerID = trigger.parentElement.id;
	
	this.needsUI.updateUI();
};

UIController.prototype.updateUI = function() {
	this.skillsUI.updateUI(this.actions, this.actionsOnScreen, this.needsUI, this.uiConsole);
	this.needsUI.updateUI();
};

/**
 * @name doAction
 * @description shows the effects of doing a certain action
 * @function
 * @param event - containing the following:
 * @param event.data.action - the action that was clicked,
 * @param event.data.you
 * @param event.data.uiController
 */

UIController.prototype.doAction = function( event ) {
	var you = event.data.you;
	var action = event.data.action;
	var control = event.data.uiController;
	
	you.uiConsole.describeAction(action);
	
	//deal with skills
	for (const skillObj of action.skills) {
		you.incSkill(skillObj.skillName, skillObj.amount);	//increment skill in You
		
		//build skills display, if necessary
		if (!you.hasSkills) {
			SkillsUI.prototype.firstSkill(you, skillObj);
		}
		
		//add a new progressbar, if necessary
		else if (!$("#hidableSkillsBar ." + skillObj.skillName).length) {
			SkillsUI.prototype.newSkill(you, skillObj);
		}
		
		var progressbarElement = $("#" + skillObj.skillName + "Progressbar").data("Progressbar");
		progressbarElement.incValue(skillObj.amount); //show change in ui
	}
	
	//deal with needs
	if (control.needs) {	//not every action has needs
		for (const need of action.needs) {
			you.decNeed(need);	//decrement need in You
			you.needsUI.updateUI();	//show change in ui
		}
	}
	for (var need in you.needs) {
		you.decNeed(need, action.time);
	}
	
	you.time += action.time;
	control.skillsUI.updateUI(control.actions, control.actionsOnScreen, control, control.uiConsole);
	
	//if your needs get too low you cry
	var crying = false;
	if (you.needs["sleep"] < 5)
		crying = true;
	for (var need in you.needs) {
		if (you.needs[need] < 3) {
			crying = true;
		}
	}
	if (crying)
		$("#cry").click();
	control.needsUI.updateUI();
};