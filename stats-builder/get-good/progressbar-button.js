/*eslint-env jquery */

/**
 * @name ProgressbarButton
 * @description progressbar buttons are used when an activity takes some continuous time
 * @param you
 * @param action - the name of the action this progressbar button tracks
 * @param actionMethod - the method that should be called to carry out the action
 * @param actionMethodArgs - the arguments to be passed to the actionMethod
 * @param text - the text that should be displayed
 * @param whereput - where the progressbar button should be put
 * @param id - a unique id for the html element attached to this progressbar
 * @param time - the time in ms it takes to complete the action
 * @param disablesButton - a list of selectors for other buttons this progressbar button disables
 * @param disablesProgressbarButton - a list of selectors for other progressbar buttons this progressbar button disables
 */
function ProgressbarButton( you, action, actionMethod, actionMethodArgs, text, whereput, id, time, disablesButton, disablesProgressbarButton ) {
	this.whereput = whereput;
	this.watching = you;
	this.action = action;
	this.actionMethod = actionMethod;
	this.actionMethodArgs = actionMethodArgs;
	this.text = text;
	this.id = id;
	this.selector = whereput + " #" + id;
	this.time = time;
	this.disables = disablesButton;
	this.disablesPB = disablesProgressbarButton;
		
	const creationPromise = this.create(whereput);
	var thisButton = this;
	creationPromise.then(function(result) {
		thisButton.bindEvents(result);
	});
}

ProgressbarButton.prototype.create = function() {
	var thisButton = this;
	
	return new Promise(function(resolve, reject) {
		$(thisButton.whereput).append(
			`<div class='progressbar-button' id='` + thisButton.id + `'>
				<div class='progressbar-button-text'>` + thisButton.text + `</div>
				<div class='progressbar-button-value'></div>
			</div>`
		);

		var created = document.getElementById(thisButton.id);		
		if (created !== null)
			resolve(thisButton);
		else
			reject("creation failed of " + thisButton.selector);
	});
};

ProgressbarButton.prototype.bindEvents = function( subject ) {
	var thisButton = $(subject.selector);

	$(subject.selector).on("click", {selector: subject.selector}, subject.doAction)
		.on("mousedown", {selector: subject.selector}, subject.showClick)
		.on("mouseup", {selector: subject.selector}, subject.showMouseEnter)
		.on("mouseenter", {selector: subject.selector}, subject.showMouseEnter)
		.on("mouseleave", {selector: subject.selector}, subject.showMouseLeave);
};

/**
 * @name ProgressbarButton.prototype.disable
 * @description no longer doAction when clicked and grays out
 * @function
 */
ProgressbarButton.prototype.disable = function() {
	$(this.selector).css('opacity', '.35');
	$(this.selector).off("click");
};

/**
 * @name ProgressbarButton.prototype.enable
 * @description restores doAction and color
 * @function
 */
ProgressbarButton.prototype.enable = function() {
	$(this.selector).css('opacity', '1');
	$(this.selector).on("click", {selector: this.selector}, this.doAction);
};

//events responding to listeners ("this" will be different)

/**
 * @name ProgressbarButton.prototype.doAction
 * @description animates an action being completed
 * @function
 */
ProgressbarButton.prototype.doAction = function( event ) {
	var selector = event.data.selector;
	var thisPB = $(selector).data("ProgressbarButton");
	var disables = thisPB.disables;
	var disablesPB = thisPB.disablesPB;
	
	//disables itself and any other buttons/pb given
	$(selector).off("click");
	for (const button in disables) {
		$(disables[button]).button("disable");
	}
	for (const button in disablesPB) {
		$(disablesPB[button]).data("ProgressbarButton").disable();
	}
	
	$(selector + " .progressbar-button-value").animate({'width': '100%'}, {'duration': thisPB.time}).promise().done(function() {
		thisPB.actionMethod(thisPB.actionMethodArgs);
		//animates, then reenables itself and resets to 0
		$(selector).on("click", {selector: selector}, thisPB.doAction);
		for (const button in disables) {
			$(disables[button]).button("enable");
		}
		for (const button in disablesPB) {
			$(disablesPB[button]).data("ProgressbarButton").enable();
		}
		$(selector + " .progressbar-button-value").css('width', '0px');
		thisPB.watching.time += thisPB.time/1000;
		thisPB.watching.uiController.needsUI.updateUI();
	});
};

/**
 * @name ProgressbarButton.prototype.showMouseEnter
 * @description changes display to reflect mouse being over this button
 * @function
 * @param event - passes selector for this button
 */
ProgressbarButton.prototype.showMouseEnter = function( event ) {
	$(event.data.selector).css('background', '#ededed');
	$(event.data.selector).css('color', '#454545');
};

/**
 * @name ProgressbarButton.prototype.showMouseLeave
 * @description changes display to reflect mouse not being over this button
 * @function
 * @param event - passes selector for this button
 */
ProgressbarButton.prototype.showMouseLeave = function( event ) {
	$(event.data.selector).css('background', '#f6f6f6');
};

/**
 * @name ProgressbarButton.prototype.showMouseLeave
 * @description changes display to reflect button being clicked
 * @function
 * @param event - passes selector for this button
 */
ProgressbarButton.prototype.showClick = function( event ) {
	$(event.data.selector).css('background', '#007fff');
	$(event.data.selector).css('color', '#fff');
};