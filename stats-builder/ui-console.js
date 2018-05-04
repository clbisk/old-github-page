/*eslint-env jquery */

/**
 * @name UiConsole
 * @description Prototype for the on-screen console
 * @class
 */
function UiConsole() {
	this.text = "";
}

/**
 * @name UiConsole.prototype.construct
 * @description constructs the console in the ui
 * @function
 */
UiConsole.prototype.construct = function() {
	$("#screen").append(`
		<div id="console">Happy Birthday!</div>
	`);
};

/**
 * @name UiConsole.prototype.log
 * @description changes the text in the console to param text
 * @function
 * @param text
 */
UiConsole.prototype.log = function ( text ) {
	this.text = text;
	$("#console").html(`
		<div> `+ text + `</div>
	`);
};

/**
 * @name UiConsole.prototype.add
 * @description adds the text in param text to the console
 * @function
 * @param text
 */
UiConsole.prototype.add = function ( text ) {
	this.text += text;
	$("#console").append(`
		<div> `+ text + `</div>
	`);
};

