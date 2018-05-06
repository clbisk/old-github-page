/*eslint-env jquery */

//actions.push(
//	new Action("poop", "thisBoi.time===0", "levelOf(thisBoi.pooping)===1", "null", "pooping+=1", "clean-=1"),
//	new Action("make noises","thisBoi.time===0","						levelOf(thisBoi.language)===2","	null","			language+=1","					null"),
//	new Action("super poop", "levelOf(thisBoi.pooping)===1", "null", "null", "pooping+=1", "null"),
//	new Action ("honk", "thisBoi.time==0", "null", "null", "language+=1", "null")
//);

///**
// * @name action
// * @description an action that might be unlocked
// * @param name - what this action is called in the ui
// * @param unlockReq - when this action should be unlocked
// * @param removeReq - when this action becomes redundant
// * @param buff - any temporary buff that might follow doing this action
// * @param skills - a list of skills to be improved
// * @param needs - a list of needs to be decremented
// */
//function Action(name, unlockReq, removeReq, buff, skills, needs) {
//	this.name = name;
//	this.removeReq = removeReq.trim();
//	this.unlockReq = unlockReq.trim();
//	this.buff = buff.trim();
//	
//	//brackets means there's many
//	if (skills !== null && skills.charAt(0) === '{')
//		this.skills = skills.trim();
//	else
//		this.skill = skills.trim();
//	
//	if (needs !== null && needs.charAt(0) === '{')
//		this.needs = needs.trim();
//	else
//		this.need = needs.trim();
//}

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
	
	//deal with skill if there is one
	if (action.skill !== null && action.skill !== undefined) {
		you.incSkill(action.skill);		//increment skill in You
		fillProgressbar(you, action.skill);	//show change in ui
	}
	//deal with skills if there are many
	else {
		for (const skill of action.skills) {
			you.incSkill(skill);	//increment skill in You
			fillProgressbar(you, skill);	//show change in ui
		}
	}
	
	//deal with need if there is one
	if (action.need !== null && action.need !== undefined) {
		you.decNeed(action.need);	//decrement need in You
		//TODO: how oh no			//show change in ui
	}
	//deal with needs if there are many
	else {
		for (const need of action.needs) {
			you.decNeed(need);	//decrement need in You
			//TODO: how oh no	//show change in ui
		}
	}
	
	//TODO: deal with buffs
	
	you.time += 1;
	updateUI(you, actions, actionsOnScreen);
}