//at startup
$(document).ready(function() {
	//bind event listener to selectors and buttons
	$('#screen').on('selectmenuchange', '.selector', menuchange);
	$('#screen').on('click', '.reset', reset);
	
	//start first scene
	seniorSelect();
});

//lays out some scenes that occur in the lifesim

//this is the one where you're a li'l kid dreaming about your
//future and you chose a "life goal" which can be adjusted later
function dream() {
	$('.screen').append(`
			Wooow you're having a dream
			<div></div>
			Good for youuu
	`);
}

//this is the one where you're chosing your high-school senior
//year classes
function seniorSelect() {
	$('#screen').append(`
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