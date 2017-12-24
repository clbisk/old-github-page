/*eslint-env jquery */

/**
 * @name actions
 * @description array holding all of the actions in the game
 */
var actions = [];

actions.push(
	new Action("poop", "t==0", "levelOf(poop)==1", "null", "pooping+=1", "clean-=1"),
	new Action("make noises","t==0","						levelOf(language)==2","	null","			language+=1","					null")
);
//TODO: read from file

/**
 * @name action
 * @description creates a new action that might be unlocked
 * @param name - what this action is called in the ui
 * @param unlockReq - when this action should be unlocked
 * @param removeReq - when this action becomes redundant
 * @param buff - any temporary buff that might follow doing this action
 * @param skills - a list of skills to be improved
 * @param needs - a list of needs to be decremented
 */
function Action(name, unlockReq, removeReq, buff, skills, needs) {
	this.name = name;
	this.removeReq = removeReq.trim();
	this.unlockReq = unlockReq.trim();
	this.buff = buff.trim();
	
	//brackets means there's many
	if (skills.charAt(0) === '{')
		this.skills = skills.trim();
	else
		this.skill = skills.trim();
	
	if (needs.charAt(0) === '{')
		this.needs = needs.trim();
	else
		this.need = needs.trim();
}

/**
 * @name updateUI
 * @description adds actions that have been unlocked when unlocked and removes redundant actions when they are redundant
 * @function
 * @param you - keeps track of you
 */
function updateUI(you) {
	for (var action of actions) {
		//make sure action is of type Action
		if (action instanceof Action) {
			//add anything that has add requirement satisfied
			if (action.unlockReq) {
				if (!$("#" + action.name).length) {
					var nameID = action.name.replace(/\s/g, '');
					$("#actions").append(`
						<button id='` + nameID + `'>` + action.name + `</button>
					`);
					$("#" + nameID).button();
					$("#" + nameID).on("click", {you: you, action: action}, doAction);
				}
			}
			
			//remove anything that has remove requirement satisfied
			if (action.removeReq)
				$("#actions").remove("#" + action.name);

		} else {
			console.error("Uh oh! There was a non-Action in the action list");
		}
	}
}

/**
 * @name doAction
 * @description levels up a stat when you do the corresponding action
 * @function
 * @param event - mmmmm event data
 */
function doAction( event ) {
	var you = event.data.you;
	var action = event.data.action;
	
	//make sure action is of type Action
	if (action instanceof Action) {
		console.log("you " + action.name);
		
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
		
	} else { console.error("Oh no! " + action + " is not type Action");	}
}