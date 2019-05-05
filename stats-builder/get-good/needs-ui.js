/*eslint-env jquery */

/**
 * @name NeedsUI
 * @description controls the needs progressbar buttons and status progressbars
 * @param you
 * @param needsActions
 */
function NeedsUI(you, needsActions, needsOnScreen) {
	this.watching = you;
	this.needs = you.needs;
	this.needsActions = needsActions;
	this.needsOnScreen = needsOnScreen;
}

/**
 * @name NeedsUI.prototype.construct
 * @description constructs the needs section in the sidebar
 * @function
 */
NeedsUI.prototype.construct = function() {
	//constructing the need response actions
	$("#screen").append(`
	<div id="needsButtons">
		<div id="needActions"></div>
		
		<div id="needResponses"></div>
	</div>`);
	
	//constructing the needs sidebar
	$("#sidebar").append(`
		<div id='stats'>
			<div id='time'>time: ` + this.watching.time + `</div>
		</div>
		
		<br> 
		<div id='needs'></div>
	`);
	
	<!--CHEATS FOR TESTING-->
	$("#screen").append(`<button id='skip'>SKIP >></button>`);
	$("#skip").on("click", {you: this.watching, needsUI: this}, this.timePlus100);
};

/**
 * @name NeedsUI.prototype.timeTo100
 * @description sets time to 100 (used for testing)
 * @function
 * @param event - contains event.data.you
 */
NeedsUI.prototype.timePlus100 = function( event ) {
	event.data.you.time += 100;
	event.data.needsUI.updateUI();
};

/**
 * @name newNeed
 * @description adds a new need to the needs sidebar if necessary
 * @function
 * @param need - the name of need to add a progressbar for
 */
NeedsUI.prototype.newNeed = function( you, need ) {
	$("#needs").append(`
		<div class="` + need + `">
			<div class='progressbar-name'>` + need + `</div>
			<div id="` + need + `Progressbar" class='progressbar'>
				<div id="` + need + `ProgressbarValue" class='progressbar-value'></div>
			</div> 
		</div>
	`);
	
	var selector = "#needs #" + need + "Progressbar";
	var newProgressbar = new Progressbar(you, need, selector, 0, 20, false, false);
	//associates the newly made progressbar with the physical div
	$(selector).data("Progressbar", newProgressbar);
};

/**
 * @name updateUI
 * @description changes needs bars as necessary
 * @function
 */
NeedsUI.prototype.updateUI = function() {
	this.needs = this.watching.needs;
	var you = this.watching;
	
	//construct needs status progressbars
	for (var need in this.needs) {
		if (!$("#needs #" + need + "Progressbar").length)
			this.newNeed(you, need);
		
		$("#" + need + "Progressbar").data("Progressbar").setValue(you.needs[need]);
	}
	
	//update the time according to player "knowledge" of time
	if (!this.watching.trackTimeHours)
		$("#time").html("time: " + you.time);
	else {
		if (you.time >= 24) {
			you.day += 1;
			you.time = this.watching.time - 24;
			you.schoolToday = true;
		}
		
		$("#time").html("time: " + this.watching.time + ":00");
		
		//check if first day of school
		if (you.firstDayOfSchool) {
			you.uiConsole.add("Today is your first day of school! School starts at 8:00.");
		}
		
		//check if need to go to school
		if (you.schoolToday && this.watching.time >= 8) {
			you.uiController.goToSchool();
			you.firstDayOfSchool = false;
			you.schoolToday = false;
		}
	}
	
	for (var action of this.needsActions) {
		//add anything that has add requirement satisfied
		if (eval(action.unlockReq.field) === action.unlockReq.value) {
			//if not already found
			if (!$("#" + action.id).length) {
				this.needsOnScreen.push(action);
				
				//construct the need actions as a new progressbar button
				var progressbarButton = new ProgressbarButton(this.watching, action.id, eval(action.handlerMethod), {you: this.watching, needsUI: this},
							action.text, action.location, action.id, action.time, eval(action.disablesSkillActions), eval(action.disablesNeedActions));
				$('#' + action.id).data("ProgressbarButton", progressbarButton);
				
				this.watching.uiConsole.add("You learned how to " + action.name + ".");
				
				$("#" + action.id).effect("highlight", "slow");
			}
		}
	}
	
	for (var needOnScreen of this.needsOnScreen) {
		//remove anything that has remove requirement satisfied
		if (needOnScreen.removeReq) {	//not all needs actions have a removeReq
			if (eval(needOnScreen.removeReq.field) === needOnScreen.removeReq.value) {
				this.removeAction(needOnScreen);
			}
		}
	}
};

/**
 * @name NeedsUI.prototype.replaceNeedsOnScreen
 * @description repopulates #actions with all the needs buttons that are in needsOnScreen
 * @function
 */
NeedsUI.prototype.replaceNeedsOnScreen = function() {
	$("#needsButtons").append(`
		<div id="needActions"></div>
		<div id="needResponses"></div>
	`);
	for (var needKey in this.needsOnScreen) {
		var needsAction = this.needsOnScreen[needKey];
		var progressbarButton = new ProgressbarButton(this.watching, needsAction.id, eval(needsAction.handlerMethod), {you: this.watching, needsUI: this},
					needsAction.text, needsAction.location, needsAction.id, needsAction.time, eval(needsAction.disablesSkillActions), eval(needsAction.disablesNeedActions));
		$('#' + needsAction.id).data("ProgressbarButton", progressbarButton);
	}
};

/**
 * @name removeAction
 * @description removes a clickable action from the UI when redundant
 * @param you
 * @param needAction - need action to be removed
 */
NeedsUI.prototype.removeAction = function( needAction ) {
	$("#" + needAction.name).effect("fade", "slow").promise().done(function() {
		$("#" + needAction.name).remove();
	});
	
	var loc = this.needsOnScreen.indexOf(needAction);
	this.needsOnScreen.splice(loc, 1);
};

/**
 * @name dream
 * @description when you sleep you might dream!
 * @function
 */
NeedsUI.prototype.dream = function( args ) {
	var toDreamOrNotToDream = Boolean(Math.round(Math.random()));
	if (toDreamOrNotToDream) {
//		$("#console").html("You had a dream! It wasn't very memorable.");
		this.watching.uiConsole.log("You had a dream! It wasn't very memorable.");
		args.you.incSkill("imagination", 1);
	} else {
//		$("#console").html("You slept like a baby. Which is to say for about five minutes, then woke up and went back to screaming.");
		this.watching.uiConsole.log("You slept like a baby. Which is to say for about five minutes, then woke up and went back to screaming.");
	}
	args.you.needs["energy"] = 20;
};

/**
 * @name triggerParent
 * @description when you cry, a parent will come over and check on your needs
 * @function
 * @param args - an element containing all the neccessary args:
 * @param args.you is the You,
 * @param args.uiConsole is the UIConsole,
 * @param args.needsUI is the NeedsUI
 */
NeedsUI.prototype.callParent = function( args ) {
	//one of the parents rushes over
	var parent = "mom";
	if (Math.random() < 0.5) {
		parent = "dad";
	}
	$("#console").html("Oh look! It's " + parent + ".");
	
	//if you're in need of something
	$.each( args.you.needs, function(key, value) {
		if (value < 10) {
			args.you.uiConsole.add( "<br>" + parent + ` saw that you were low on ` + key + ".");
			args.you.needs[key] = 20;
		}
	});
};