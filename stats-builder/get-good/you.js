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
 * @param console
 */
function You( console ) {
	this.uiConsole = console;
	this.time;
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
	
	//when you're just born, you don't have any skills
	this.hasSkills = false;
	
	//when you're just born, you haven't been alive for any time
	this.time = 0;
	
	//initialize needs
	this.needs = {};
	this.needs["hunger"] = 18;
	this.needs["hygene"] = 18;
	this.needs["social"] = 18;
	this.needs["energy"] = 18;
	
	//fill the main ui with stuff
	$("#screen").html(`
		<div id="actions"></div>
	`);
	
	//initialize the first buttons
	$("button").button();
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
	this.needs[need] -= amount;
};

//functions responding to listeners -- "this" becomes the event origin instead of You

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
	$.each( thisBoi.needs, function(key, value) {
		if (value < 10) {
			$("#console").append(`
				<br>` + parent + ` saw that you were low on ` + key + `.
			`);
			thisBoi.needs[key] = 20;
		}
	});
};