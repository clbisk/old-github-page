/*eslint-env jquery */

/**
 * @name ProgressbarButton
 * @description progressbar buttons are used when an activity takes some continuous time
 * @param you
 * @param action - the name of the action this progressbar button tracks
 * @param actionMethod - the method that should be called to carry out the action
 * @param selector - a unique selector for the html element attached to this progressbar
 * @param time - the time in ms it takes to complete the action
 * @param disablesButton - a list of selectors for other buttons this progressbar button disables
 * @param disablesProgressbarButton - a list of selectors for other progressbar buttons this progressbar button disables
 */
function ProgressbarButton( you, action, actionMethod, selector, time, disablesButton, disablesProgressbarButton ) {
	this.watching = you;
	this.action = action;
	this.actionMethod = actionMethod;
	this.selector = selector;
	this.time = time;
	this.disables = disablesButton;
	this.disablesPB = disablesProgressbarButton;
	
	$(selector).on("click", {selector: selector}, this.doAction);
	$(selector).on("mousedown", {selector: selector}, this.showClick).on("mouseup", {selector: selector}, this.showMouseEnter);
	$(selector).on("mouseenter", {selector: selector}, this.showMouseEnter);
	$(selector).on("mouseleave", {selector: selector}, this.showMouseLeave);
}

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
		thisPB.actionMethod();
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