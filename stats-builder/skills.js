/*eslint-env jquery */

/**
 * @name doAction
 * @description levels up a stat when you do the corresponding action
 * @function
 * @param event - event data holding performer of action (you) and the action being done
 * @param actions
 * @param actionsOnScreen
 */
function doAction( event ) {
	var you = event.data.you;
	var action = event.data.action;
	var actions = event.data.actions;
	var actionsOnScreen = event.data.actionsOnScreen;
	
	you.uiConsole.log("You " + action.name + ".");
	
	//deal with skills
	for (const skillObj of action.skills) {
		you.incSkill(skillObj.skill, skillObj.amount);	//increment skill in You
		fillProgressbar(you, skillObj);	//show change in ui
	}
	
	//deal with needs
	for (const need of action.needs) {
		you.decNeed(need);	//decrement need in You
		//TODO: how oh no	//show change in ui
	}
	
	//TODO: deal with buffs
	
	you.time += 1;
	updateUI(you, actions, actionsOnScreen);
}