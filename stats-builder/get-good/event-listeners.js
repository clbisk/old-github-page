/**
 * @name doAction
 * @description levels up a stat when you do the corresponding action
 * @function
 * @param event - event data holding the uiController for the performer of action (you) and the action being done
 */

function doAction( event ) {
	var action = event.data.action;
	var uiController = event.data.uiController;
	
	uiController.doAction(action);
}