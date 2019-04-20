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
 * @param event - event.action is the action to be done, event.you is the you
 */

UIController.prototype.doAction = function( event ) {
	
	event.data.you.uiConsole.describeAction(event.data.action);
	
	//deal with skills
	for (const skillObj of event.data.action.skills) {
		event.data.you.incSkill(skillObj.skillName, skillObj.amount);	//increment skill in You
		
		//build skills display, if necessary
		if (!event.data.you.hasSkills) {
			SkillsUI.prototype.firstSkill(event.data.you, skillObj);
		}
		
		//add a new progressbar, if necessary
		else if (!$("#hidableSkillsBar ." + skillObj.skillName).length) {
			SkillsUI.prototype.newSkill(event.data.you, skillObj);
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
		for (const need of event.data.action.needs) {
			this.watching.decNeed(need);	//decrement need in You
			this.needsUI.updateUI();	//show change in ui
		}
	}
	incTime(this.watching, event.data.action.time);
	
	this.watching.time += event.data.action.time;
	this.skillsUI.updateUI(this.actions, this.actionsOnScreen, this, this.uiConsole);
	this.needsUI.updateUI();
	
	//if your needs get too low you cry
	var crying = false;
	for (var need in this.watching.needs) {
		if (this.watching.needs[need] < 3) {
			crying = true;
		}
	}
	if (crying)
		this.needsUI.callParent( {you: this.watching, uiConsole: this.uiConsole, needsUI: this.needsUI} );
	this.needsUI.updateUI();
};