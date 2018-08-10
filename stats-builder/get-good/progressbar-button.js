/*eslint-env jquery */

/**
 * @name ProgressbarButton
 * @description progressbar buttons are used when an activity takes some continuous time
 * @param you
 * @param action - the name of the action this progressbar button tracks
 * @param selector - a unique selector for the html element attached to this progressbar
 * @param time - the time in ms it takes to complete the action
 * @param disables - a list of selectors for other buttons this button disables
 */
function ProgressbarButton( you, action, selector, time, disables ) {
	this.watching = you;
	this.action = action;
	this.selector = selector;
	this.time = time;
	this.disables = disables;
	
	$(selector).on("click", this.doAction);
	$(selector).on("mousedown", {selector: selector}, this.showClick).on("mouseup", {selector: selector}, this.showMouseEnter);
	$(selector).on("mouseenter", {selector: selector}, this.showMouseEnter);
	$(selector).on("mouseleave", {selector: selector}, this.showMouseLeave);
}

/**
 * @name ProgressbarButton.prototype.doAction
 * @description animates an action being completed
 * @function
 */
ProgressbarButton.prototype.doAction = function() {
	var maxWidth = $(this.selector).width();
	for (const button in this.disables) {
		$(button).button("disable");
	}
	
	$(this.selector).children().animate({width: maxWidth}, {duration: this.time}).promise().done(function() {
		for (const button in this.disables) {
			$(button).button("enable");
		}
	});
};

//events responding to listeners ("this" will be different)

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