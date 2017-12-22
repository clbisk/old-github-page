/*eslint-env jquery */

/**
 * @name thisBoi
 * @description keeps track of you after initialization for when events happen
 */
var thisBoi;

/**
 * @name You
 * @description Prototype for keeping track of player data and messing with the UI
 * @class
 */
function You() {
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
			<div id=language>Language: ` + Math.trunc(this.language) + `</div>
			<div id=imagination>Imagination: ` + Math.trunc(this.imagination) + `</div>
			<div id=coordination>Coordination: ` + Math.trunc(this.coordination) + `</div>
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
		<div id="actions">
			<button class='language'>make random noises</button>
			<button class='coordination'>make fists</button>	
		</div>
		
		<div id="chanceEvents">
			<button id='dreamEvent'>sleep</button>
		</div>
		
		<div id="needResponses">
			<button id='parentEvent'>cry</button>
		</div>
	`);
	//initialize the first buttons
	$("button").button();
	$("#actions button").on("click", doAction(this));
	$("#dreamEvent").on("click", this.dream);
	$("#parentEvent").on("click", this.callParent);
	
	//wish the player happy birthday!
	$("#screen").append(`
		<div id="console">Happy birthday!</div>
	`);
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
 * @param amount - how much better you get
 */
You.prototype.incSkill = function( statUp, amount ) {
	this[statUp] += amount;
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
	//TODO: finish this better
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