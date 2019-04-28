/*eslint-env jquery */
$(document).ready(function() {
	/**
	 * @name actionsOnScreen
	 * @description array holding all of the actions that are currently clickable
	 */
	var actionsOnScreen = [];
	
	/**
	 * @name actions
	 * @description array holding all of the actions in the game
	 */
	var actions = [];
	
	/**
	 * @name needsActions
	 * @description array holding all of the needs actions in the game
	 */
	var needsActions = [];
	
	var a = readActions()
		.then((response) => {storeActions(response, actions);});
		
	var b = readNeedsActions()
		.then((needsResponse) => {storeNeedsActions(needsResponse, needsActions);});
		
	Promise.all([a, b]).then(() => {startup(needsActions, actions, actionsOnScreen);})
		.catch((failure) => {console.log("failed with status " + failure);});
});

/**
 * @name readActions
 * @description reads JSON data for actions with AJAX
 * @param handleData - callback function to handle data once read
 * @param actions - the array to keep actions in
 * @returns promise with file text if success
 */
function readActions() {
	return new Promise((resolve, reject) => {
		var xmlhttp = new XMLHttpRequest();
//		xmlhttp.onreadystatechange = function() {
//			if (this.readyState === 4 && this.status === 200) {
//				handleData(this, actions);
//			}
//		};
		xmlhttp.open("GET", "/actions.json");
		xmlhttp.onload = () => resolve(xmlhttp.responseText);
		xmlhttp.onerror = () => reject(xmlhttp.statusText);
		xmlhttp.send();
	});
}

/**
 * @name storeActions
 * @description readies all data
 * @param xmlhttp - the json data recieved earlier
 * @param actions - the array to keep actions in
 * @returns promise
 */
function storeActions(response, actions) {
	return new Promise((resolve, reject) => {
		var actionsData = JSON.parse(response);
		for (var actionKey in actionsData) {
			//make sure the key/value wasn't inherited
			if (actionsData.hasOwnProperty(actionKey)) {
				actions.push(actionsData[actionKey]);
			}
		}
		return resolve("succuessfuly stored actions");
	});
}

/**
 * @name readNeedsActions
 * @description reads JSON data for actions with AJAX
 * @param handleData - callback function to handle data once read
 * @param actions - the array to keep actions in
 * @returns promise with file text if success
 */
function readNeedsActions() {
	return new Promise((resolve, reject) => {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", "/needs-actions.json");
		xmlhttp.onload = () => resolve(xmlhttp.responseText);
		xmlhttp.onerror = () => reject(xmlhttp.statusText);
		xmlhttp.send();
	});
}

/**
 * @name storeNeedsActions
 * @description readies all data
 * @param xmlhttp - the json data recieved earlier
 * @param actions - the array to keep actions in
 * @returns promise
 */
function storeNeedsActions(response, needsActions) {
	return new Promise((resolve, reject) => {
		var needsActionsData = JSON.parse(response);
		for (var needsActionKey in needsActionsData) {
			//make sure the key/value wasn't an inherited
			if (needsActionsData.hasOwnProperty(needsActionKey)) {
				needsActions.push(needsActionsData[needsActionKey]);
			}
		}
		return resolve("succuessfuly stored needs actions");
	});
}
/**
 * @name startup
 * @description sets up ui and data
 * @param actions
 * @param actionsOnScreen
 */
function startup(needsActions, actions, actionsOnScreen) {
	//bind general event listener to selectors and buttons
	$('#screen').on('selectmenuchange', '.selector', menuchange);
	$('#screen').on('click', '.reset', reset);
	
	//intialize ui
	var you = new You();
	var uiConsole = new UiConsole(you);
	var skillsUI = new SkillsUI(you, actions, actionsOnScreen);
	var needsUI = new NeedsUI(you, needsActions);
	
	//your character is born!!
	you.birth();
	var uiController = new UIController(you, uiConsole, needsUI, skillsUI, actions, actionsOnScreen);
	//uiController.updateUI();
}