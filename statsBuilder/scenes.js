/*eslint-env jquery */

//at startup
$(document).ready(function() {
	//bind general event listener to selectors and buttons
	$('#screen').on('selectmenuchange', '.selector', menuchange);
	$('#screen').on('click', '.reset', reset);
	
	//your character is born!!
	var you = new You();
	you.birth();
});

/**lays out some scenes that occur in the lifesim**/
//this is the one where you're a li'l kid dreaming about your
//future and you chose a "life goal" which can be adjusted later
function dreamJob() {
	$('#screen').html(`
			Wooow you're having a dream
			<br><br>
			Good for youuu
	`);
}

//this is the one where you're chosing your high-school senior
//year classes
function seniorSelect() {
	$('#screen').html(`
			Ooooooh boy it's your senior year of high-school
			and it's time to pick them claaasses.
			<br>
			<br>
			<form method="post" id='seniorform'>
				<fieldset class='classes' id='senior'>
					<legend>Classes</legend>
					<div class='controlgroup-vertical'></div>
					<input type="submit" value="submit" class='controlgroup-vertical'>
					<button type="button" class='reset controlgroup-vertical'>reset</button>
				</fieldset>
			</form>
	`);
	
	//attach submit listener
	$('#screen').on('submit', '#seniorform', function() {
		seniorformsubmit(event);
	});
	
	//build jquery ui elements
	$('.controlgroup-vertical').controlgroup({'direction': "vertical"});
	$('input').button();
	$('button').button();
	
	seniorClasses();
}