/*eslint-env jquery */

/**
 * @name time
 * @description how long your character has been alive
 */
var time;

/**
 * @name thisBoi
 * @description keeps track of you after initialization
 */
var thisBoi;

/**
 * @name Baby
 * @description Prototype for when you such a li'l baby child
 * @class
 */
function You() {
	this.language;
	this.imagination;
	this.coordination;
	
	this.needs = {};
	
	this.hasSkills;
}

/**
 * @name birth
 * @description randomizes your stats a little and starts you off as a baby child
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
	
	//initialize skills randomly
	this.language = Math.round((Math.random() * 2) + 1);
	this.imagination = Math.round((Math.random() * 2) + 1);
	this.coordination = Math.round((Math.random() * 2) + 1);
	this.hasSkills = false;
	
	//when you're just born, you haven't been alive for any time
	time = 0;

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
	//initialize the buttons
	$("button").button();
	$("#actions button").on("click", this.doAction);
	$("#dreamEvent").on("click", this.dream);
	$("#parentEvent").on("click", this.callParent);
	
	//tell the player happy birthday!
	$("#screen").append(`
		<div id="console">Happy birthday!</div>
	`);
};

/**
 * @name firstSkill
 * @description adds the skill box when you do your first ever action
 * @function
 */
You.prototype.firstSkill = function( skill ) {
	this.hasSkills = true;
	
	//TODO: make sure the skill bar goes all the way from left to right
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
	
	this[skill]++;
	fillProgressbar( skill + "Progressbar", this[skill], $("#hidableSkillsBar ." + skill + " .progressbar-label"));
};


//functions responding to listeners

/**
 * @name doAction
 * @description levels up a stat when you do the corresponding action
 * @function
 */
You.prototype.doAction = function() {
	var classes = $(this).attr("class");
	var statUp = classes.split(" ")[0];
	if (!thisBoi.hasSkills) {
		thisBoi.firstSkill(statUp);
	}
};

/**
 * @name dream
 * @description when you sleep you might dream!
 * @function
 */
You.prototype.dream = function() {
	var toDreamOrNotToDream = Boolean(Math.round(Math.random()));
	if (toDreamOrNotToDream) {
		$("#console").html("You had a dream! It wasn't very memorable.");
		thisBoi.imagination++;
	}
};

/**
 * @name triggerParent
 * @description when you cry, a parent will come over and check on your needs
 * @function
 */
You.prototype.triggerParent = function() {
	
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