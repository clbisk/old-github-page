/*eslint-env jquery */

function NeedsUI(you) {
	this.watching = you;
	this.needs = you.needs;
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
	
	var dreamProgressbarButton = new ProgressbarButton(this.watching, "dream", this.dream, {you: this.watching, needsUI: this}, "sleep", "#needActions", "dream", 1000, ["#actions button"], ["#needResponses .progressbar-button"]);
	$("#dream").data("ProgressbarButton", dreamProgressbarButton);
	
	var cryProgressbarButton = new ProgressbarButton(this.watching, "cry", this.callParent, {you: this.watching, needsUI: this}, "cry", "#needResponses", "cry", 2000, ["#actions button"], ["#needActions .progressbar-button"]);
	$("#cry").data("ProgressbarButton", cryProgressbarButton);
	
	//constructing the needs sidebar
	$("#sidebar").append(`
		<div id='stats'>
			<div id='time'>time: ` + this.watching.time + `</div>
		</div>
		
		<br>
		<div id='needs'></div>
	`);
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
	
	for (var need in this.needs) {
		if (!$("#needs #" + need + "Progressbar").length)
			this.newNeed(this.watching, need);
		
		$("#" + need + "Progressbar").data("Progressbar").setValue(this.watching.needs[need]);
	}
	
	console.log("updating time to: " + this.watching.time);
	
	$("#time").html("time: " + this.watching.time);
};

/**
 * @name dream
 * @description when you sleep you might dream!
 * @function
 */
NeedsUI.prototype.dream = function( args ) {
	console.log("You had a li'l dream");
	
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
	console.log("You're crying");
	
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