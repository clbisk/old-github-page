/*eslint-env jquery */

function NeedsUI(you) {
	this.watching = you;
}

/**
 * @name NeedsUI.prototype.construct
 * @description constructs the needs section in the sidebar
 * @function
 */
NeedsUI.prototype.construct = function() {
	$("#sidebar").append(`
		<div id='stats'>
			<div>time: ` + this.watching.time + `</div>
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
	var hungerProgressbar = new Progressbar("hunger", "#needs #hungerProgressbar", 18, 20);
	$("#hunger").data("progressbar", hungerProgressbar);
	var energyProgressbar = new Progressbar("energy", "#needs #energyProgressbar", 18, 20);
	$("#energy").data("progressbar", energyProgressbar);
	var hygeneProgressbar = new Progressbar("hygene", "#needs #hygeneProgressbar", 18, 20);
	$("#hygene").data("progressbar", hygeneProgressbar);
	var socialProgressbar = new Progressbar("social", "#needs #socialProgressbar", 18, 20);
	$("#social").data("progressbar", socialProgressbar);
};

/**
 * @name updateUI
 * @description changes needs bars as necessary
 * @function
 */
NeedsUI.prototype.updateUI = function() {
	$("#hunger").data().setValue(this.watching["hunger"]);
	$("#hygene").data().setValue(this.watching["hygene"]);
	$("#energy").data().setValue(this.watching["energy"]);
	$("#social").data().setValue(this.watching["social"]);
};