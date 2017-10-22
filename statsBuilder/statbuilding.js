/*eslint-env jquery */
/**
 * @name Baby
 * @description Prototype for when you such a li'l baby child
 * @class
 */
function Baby() {
	this.language;
	this.imagination;
	this.coordination;
}

/**
 * @name Baby.prototype.birth
 * @description randomizes your stats a little and starts you off as a baby child
 * @function
 */
Baby.prototype.birth = function () {
	this.language = (Math.random() * 2) + 1;
	this.imagination = (Math.random() * 2) + 1;
	this.coordination = (Math.random() * 2) + 1;
	
	$("#sidebar").append(`
		<div id='stats'>
			<div id=language>Language: ` + Math.trunc(this.language) + `</div>
			<div id=imagination>Imagination: ` + Math.trunc(this.imagination) + `</div>
			<div id=coordination>Coordination: ` + Math.trunc(this.coordination) + `</div>
		</div>
		
		<br><br><br>
		
		<div id='needs'>
			<div>hunger</div>
			<div>energy</div>
			<div'>hygene</div>
			<div'>social</div>
		</div>
	`);
	
	$("#needs div").progressbar({
		max: 20,
		value: 20
	});
	
	$("#screen").html(`
		<div id="actions">
			<button class='language'>make random noises</button>
			<button class='coordination'>make fists</button>
			
		</div>
		<div id="chanceEvents">
			<button id='dreamEvent'>sleep</button>
		</div>
		
		
	`);
	
	$("#actions button").on("click", doAction);
	$("#dreamEvent").on("click", dream);
	
	$("#screen").append(`
		<div id="console">Happy birthday!</div>
	`);
};

/**
 * @name doAction
 * @description levels up a stat when you do the corresponding action
 * @param event - passed by .on()
 * @function
 */
Baby.prototype.doAction = function( event ) {
	var statUp = $(this).attr("class");
	statUp++;
}

/**
 * @name firstSkill
 * @description adds the skill box when you do your first ever action
 * @function
 */
Baby.prototype.firstSkill = function( skill ) {
	$(document).append(`
		<div id="skills">
			<div>` + skill + `</div>
		</div>
	`);
	
	$("#skills div").progressBar();
};

/**
 * @name dream
 * @description when you sleep you might dream!
 * @param event - passed by .on()
 * @function
 */
Baby.prototype.dream = function( event ) {
	var toDreamOrNotToDream = Boolean(Math.random().round());
	if (toDreamOrNotToDream) {
		$("#console").html("You had a dream! It wasn't very memorable.");
		this.imagination++;
	}
}