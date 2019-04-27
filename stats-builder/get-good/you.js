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
function You() {
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
	
	//whether or not skills have yet been acquired
	this.hasSkills = false;
	
	//the amount of time this person has been alive for
	this.time = 0;
	//but you have no concept of time
	this.trackTimeHours = false;
	
	//this person's aspiration
	this.dream = null;
	
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



//	You.prototype.incNeeds = function( event ) {
//		for (var elem in event.data) {
//			this.decNeed(elem.need, -1 * elem.amount);
//		}
//	};