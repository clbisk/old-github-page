/*eslint-env jquery */

/**
 * @name thisBoi
 * @description keeps track of you after initialization for when events happen
 */
var thisBoi;

/**
 * @name You
 * @description Prototype for keeping track of player data
 * @class
 */
function You( console ) {
	this.uiConsole = console;
	
	this.time;
	this.language;
	this.imagination;
	this.coordination;
	
	this.needs = {};
	
	this.hasSkills;
}

/**
 * @name birth
 * @description randomizes your stats a little and starts you off as a baby child (basically the tutorial)
 * @function
 */
You.prototype.birth = function () {
	//keep track of this boi for later operations on it
	thisBoi = this;
	
	//initialize needs as full
	this.needs["hunger"] = 18;
	this.needs["energy"] = 18;
	this.needs["hygene"] = 18;
	this.needs["social"] = 18;
	
	//initialize skills at zero
	this.language = 0;
	this.imagination = 0;
	this.coordination = 0;
	this.hasSkills = false;
	
	//when you're just born, you haven't been alive for any time
	this.time = 0;

	//fill in the sidebar with stuff
	//TODO: change needs bar so that when hovered over the value/maxvalue is shown
	$("#sidebar").append(`
		<div id='stats'>
			<div>time: ` + this.time + `</div>
		</div>
		
		<br>
		 
		<div id='needs'>
			<div class='progressbar-label'>hunger</div>
			<div class='progressbar' id='hunger'></div>
			
			<div class='progressbar-label'>energy</div>
			<div class='progressbar' id='energy'></div>
			
			<div class='progressbar-label'>hygene</div>
			<div class='progressbar' id='hygene'></div>
			
			<div class='progressbar-label'>social</div>
			<div class='progressbar' id='social'></div>
		</div>
	`);
	//initialize the progressbars in the sidebar
	$("#needs .progressbar").progressbar({
		max: 20,
		value: 18
	});
	
	//fill the main ui with stuff
	$("#screen").html(`
		<div id="actions"></div>
		
		<div id="chanceEvents">
			<button id='dreamEvent'>sleep</button>
		</div>
		
		<div id="needResponses">
			<button id='parentEvent'>cry</button>
		</div>
	`);
	//initialize the first buttons
	$("button").button();
	$("#actions button").on("click", this.doAction);
	$("#dreamEvent").on("click", this.dream);
	$("#parentEvent").on("click", this.callParent);
};

/**
 * @name You.prototype.growToChild
 * @description starts the REAL GAME
 * @function
 * @returns returns
 */
You.prototype.growToChild = function() {
	//initialize new skills at random levels
	this.active = pointsAtLevel(Math.round((Math.random() * 2) + 1));
	if (this.logic === undefined)
		this.logic = pointsAtLevel(Math.round((Math.random() * 2) + 1));
		
	//transfer baby skills to their grown-up versions
	this.creativity = this.imagniation;
	this.active += this.coordination;
};

/**
 * @name You.prototype.incSkill
 * @description get better at a skill
 * @function
 * @param statUp - the skill to get better at
 */
You.prototype.incSkill = function( skill, amount ) {
	if (this[skill] === null || this[skill] === undefined)
		this[skill] = amount;
	else {
		this[skill] += amount;
	}
};

/**
 * @name You.prototype.decNeed
 * @description get more needy in some way
 * @function
 * @param statUp - the need to worsen
 */
You.prototype.decNeed = function( need, amount ) {
	this[need] -= amount;
};

//functions responding to listeners -- "this" becomes the event origin instead of You

/**
 * @name doAction
 * @description levels up a stat when you do the corresponding action
 * @function
 */
You.prototype.doAction = function() {
	//TODO: when swtiching from one skill to another stuff gets weird
	var classes = $(this).attr("class");
	var statUp = classes.split(" ")[0];
	
	//build skills display, if necessary
	if (!thisBoi.hasSkills) {
		thisBoi.firstSkill(statUp);
	} else if (! $("#hidableSkillsBar ." + statUp).length) {
		thisBoi.newSkill(statUp);
	}
	
	//TODO: disable the button for a hot minute to simulate the action being performed, maybe disable others if multitasking not possible
	//increment the skill
	thisBoi[statUp]++;
	fillProgressbarClassic( statUp + "Progressbar", thisBoi[statUp], $("#hidableSkillsBar ." + statUp + " .progressbar-label"));
	
	//TODO: what happens when bar is filled
};

/**
 * @name You.prototype.firstSkill
 * @description adds the skill box when you do your first ever action
 * @function
 * @param skill - the skill to add a progressbar for
 */
You.prototype.firstSkill = function( skill ) {
	this.hasSkills = true;
	
	$(document.body).append(`
		<div id="skills">
			<div id="handle">
				<div id="skillsOpenCloseTab">skills</div>
			</div>
			<div id="hidableSkillsBar">
				<div class="` + skill + `">
					<div class='progressbar-label'>` + skill + ` (` + this[skill] + `/5)</div>
					<div id="` + skill + `Progressbar" class='progressbar'></div>
				</div>
			</div>
		</div>
	`);
	
	$("#skills .progressbar").progressbar({
		max: 5,
		value: this[skill]
	});
	//TODO: make hidableSkillsBar hidable
};

/**
 * @name You.prototype.newSkill
 * @description adds a new progressbar to the skills tab for a new skill discovered
 * @function
 * @param skill - the skill to add a progressbar for
 */
You.prototype.newSkill = function( skill ) {
	$("#hidableSkillsBar").append(`
		<div class="` + skill + `">
			<div class='progressbar-label'>` + skill + ` (` + this[skill] + `/5)</div>
			<div id="` + skill + `Progressbar" class='progressbar'></div>
		</div>
	`);
	
	$("#skills .progressbar").progressbar({
		max: 5,
		value: this[skill]
	});
};

/**
 * @name dream
 * @description when you sleep you might dream!
 * @function
 */
You.prototype.dream = function() {
	console.log("You had a li'l dream");
	
	var toDreamOrNotToDream = Boolean(Math.round(Math.random()));
	if (toDreamOrNotToDream) {
		$("#console").html("You had a dream! It wasn't very memorable.");
		thisBoi.incSkill("imagination");
	}
};

/**
 * @name triggerParent
 * @description when you cry, a parent will come over and check on your needs
 * @function
 */
You.prototype.callParent = function() {
	console.log("You're crying");
	
	//one of the parents rushes over
	var parent = "mom";
	if (Math.random() < 0.5) {
		parent = "dad";
	}
	$("#console").html("Oh look! It's " + parent + ".");
	
	//if you're in need of something
	$.each( thisBoi.skills, function(key, value) {
		if (value < 5) {
			$("#console").append(`
				\n` + parent + ` saw that you were low on ` + key + `.
			`);
			thisBoi.skills[key] = 20;
		}
	});
};