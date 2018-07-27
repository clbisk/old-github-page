/*eslint-env jquery */
$(document).ready(function() {
	/**
	 * @name actionsOnScreen
	 * @description array holding all of the actions that are currently clickable
	 */
	var actionsOnScreen = [];
	
	/**
	 * @name progressbars
	 * @description array holding all the progressbars in use
	 */
	var progressbars = [];
	
	/**
	 * @name actions
	 * @description array holding all of the actions in the game
	 */
	var actions = [];
	
	readActions()
		.then((response) => {storeActions(response, actions);})
		.then((response) => {startup(progressbars, actions, actionsOnScreen);})
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
		xmlhttp.open("GET", "/get-good/skills.json");
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
 * @name startup
 * @description sets up ui and data
 * @param actions
 * @param actionsOnScreen
 */
function startup(progressbars, actions, actionsOnScreen) {
	//bind general event listener to selectors and buttons
	$('#screen').on('selectmenuchange', '.selector', menuchange);
	$('#screen').on('click', '.reset', reset);
	
	//initialize the ui console
	
	
	//intialize ui
	var uiConsole = new UiConsole();
	var skillsUI = new SkillsUI(you, actions, actionsOnScreen, progressbars);
		
	//your character is born!!
	var you = new You(uiConsole);
	you.birth();	
	skillsUI.updateUI(you, actions, actionsOnScreen);
	uiConsole.construct();
}