/*eslint-env jquery */

/**
 * @name doAction
 * @description levels up a stat when you do the corresponding action
 * @function
 * @param event - event data holding performer of action (you) and the action being done
 */
function doAction( event ) {
	var you = event.data.you;
	var action = event.data.action;
	var actions = event.data.actions;
	var actionsOnScreen = event.data.actionsOnScreen;
	var skillsUI = event.data.skillsUI;
	
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
		
		//make sure ui and data agree
		if (you[skillObj.skillName] !== progressbarElement.getValue()) {
			console.error(this.data + " progressbar value does not agree with you value");
		}
	}
	
	//deal with needs
	if (actions.needs) {	//not every action has needs
		for (const need of action.needs) {
			you.decNeed(need);	//decrement need in You
			//TODO: how oh no	//show change in ui
		}
	}
	
	//TODO: deal with buffs
	
	you.time += action.time;
	skillsUI.updateUI(actions, actionsOnScreen);
}