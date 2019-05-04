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
	this.skillsUI.updateUI(this.actions, this.actionsOnScreen, this, this.uiConsole);
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

UIController.prototype.goToSchool = function() {
	this.uiConsole.log("Time for school.");
	$("#actions").empty();
	$("#needsButtons").empty();
	$("#screen").prepend(`
		<div id="school">
			<br><br><br>
			<div class='progressbar-name'>School</div>
			<div id="schoolProgressbar" class='progressbar'>
				<div id="schoolProgressbarValue" class='progressbar-value'></div>
			</div> 
		<br><br><br></div>
	`);
	
	var selector = "#needs #schoolProgressbar";
	var schoolProgressbar = new Progressbar(this.watching, "school", "#schoolProgressbar", 0, 20, false, false);
	$("#school").data("Progressbar", schoolProgressbar);
	
	var uiConsole = this;
	var schoolEvent = window.setInterval(this.childSchoolEvent, 2000, this.uiConsole);
	const valSetPromise = schoolProgressbar.setValuePromiseDone(20, 10000);
	valSetPromise.then(function(result) {
		uiConsole.comeHomeFromSchool(uiConsole, schoolEvent);
	});
};

UIController.prototype.childSchoolEvent = function( uiConsole ) {
	if (Math.random() < 0.4) {
		var event = Math.random();
		if (event < 0.1)
			uiConsole.log("Jasmine gets the desk behind yours.");
		else if (event < 0.2)
			uiConsole.log("Jasmine trades snacks with you.");
		else if (event < 0.3)
			uiConsole.log("Jasmine steals some goldfish from your lunch tray.");
		else if (event < 0.4)
			uiConsole.log("You play tag with Jasmine at recess.");
		else if (event < 0.5)
			uiConsole.log("Jasmine keeps looking at you instead of the teacher during story time.");
		else if (event < 0.6)
			uiConsole.log("Jasmine's braid gets caught in her chair again.");
		else if (event < 0.7)
			uiConsole.log("Jasmine is the best in the class at math.");
		else if (event < 0.8)
			uiConsole.log("Jasmine keeps distracting you while the teacher is talking.");
		else if (event < 0.9)
			uiConsole.log("You stare out the window.");
		else
			uiConsole.log("You do arts and crafts.");
	}
};

UIController.prototype.comeHomeFromSchool = function( uiConsole, eventTimer ) {
	$("#school").empty();
	//replace all the actions in actionsOnScreen to the #actions div
	uiConsole.skillsUI.updateUI(uiConsole.actions, uiConsole.actionsOnScreen, uiConsole, uiConsole.uiConsole);
	uiConsole.needsUI.updateUI();
	window.clearInterval(eventTimer);
};

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
	
	//dream event occurs at time = 100
	if (you.dream === null && you.time >= 100)
		dreamJob(you);
};