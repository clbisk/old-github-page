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
	
	var dreamProgressbarButton = new ProgressbarButton(this.watching, "dream", this.watching.dream, "sleep", "#needActions", "dream", 1000, ["#actions button"], ["#needResponses .progressbar-button"]);
	$("#dream").data("ProgressbarButton", dreamProgressbarButton);
	
	var cryProgressbarButton = new ProgressbarButton(this.watching, "cry", this.watching.callParent, "cry", "#needResponses", "cry", 1000, ["#actions button"], ["#needActions .progressbar-button"]);
	$("#cry").data("ProgressbarButton", cryProgressbarButton);
	
	//constructing the needs sidebar
	$("#sidebar").append(`
		<div id='stats'>
			<div>time: ` + this.watching.time + `</div>
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
};