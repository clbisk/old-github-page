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
	
	skillsUI.updateUI(actions, actionsOnScreen, needsUI, uiConsole);
	needsUI.construct();
	uiConsole.construct();
	needsUI.updateUI();
}


UIController.prototype.updateUI = function() {
	this.skillsUI.updateUI(this.actions, this.actionsOnScreen, this.needsUI, this.uiConsole);
	this.needsUI.updateUI();
};

/**
 * @name doAction
 * @description shows the effects of doing a certain action
 * @function
 * @param action - the action to be done
 */

UIController.prototype.doAction = function( action ) {
	
	this.watching.uiConsole.describeAction(action);
	
	//deal with skills
	for (const skillObj of action.skills) {
		this.watching.incSkill(skillObj.skillName, skillObj.amount);	//increment skill in You
		
		//build skills display, if necessary
		if (!this.watching.hasSkills) {
			SkillsUI.prototype.firstSkill(this.watching, skillObj);
		}
		
		//add a new progressbar, if necessary
		else if (!$("#hidableSkillsBar ." + skillObj.skillName).length) {
			SkillsUI.prototype.newSkill(this.watching, skillObj);
		}
		
		var progressbarElement = $("#" + skillObj.skillName + "Progressbar").data("Progressbar");
		progressbarElement.incValue(skillObj.amount); //show change in ui
		
		//make sure ui and data agree
		if (this.watching[skillObj.skillName] !== progressbarElement.getValue()) {
			console.error(this.data + " progressbar value does not agree with you value");
		}
	}
	
	//deal with needs
	if (this.actions.needs) {	//not every action has needs
		for (const need of action.needs) {
			this.watching.decNeed(need);	//decrement need in You
			this.needsUI.updateUI();	//show change in ui
		}
	}
	incTimeDiscrete(this.watching, action.time);
	
	this.watching.time += action.time;
	this.skillsUI.updateUI(this.actions, this.actionsOnScreen, this.needsUI);
	this.needsUI.updateUI();
	
	//if your needs get too low you cry
	var crying = false;
	for (var need in this.watching.needs) {
		if (this.watching.needs[need] < 3) {
			crying = true;
		}
	}
	if (crying)
		this.watching.callParent();
	this.needsUI.updateUI();
};