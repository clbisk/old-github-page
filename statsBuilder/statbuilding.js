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
		<div id='needs'>
			<div class='progressbar'>hunger</div>
			<div class='progressbar'>energy</div>
			<div class='progressbar'>hygene</div>
			<div class='progressbar'>social</div>
		</div>
	`);
	
	$("#needs div").progressbar({
		max: 20,
		value: 20
	});
	
	$("#screen").append(`
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
	`)
};

/**
 * @name doAction
 * @description levels up a stat when you do the corresponding action
 * @param event - passed by .on()
 */
function doAction( event ) {
	var statUp = $(this).attr("class");
}

/**
 * @name firstSkill
 * @description adds the skill box when you do your first ever action
 * @returns returns
 */
function firstSkill() {
	$(document).append(`
		<div id="skills"></div>
	`);
}

/**
 * @name dream
 * @description when you sleep you might dream!
 * @param event - passed by .on()
 */
function dream( event ) {
	var toDreamOrNotToDream = Math.random();
	
}