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
			<form id='senior'>
				<fieldset class='classes'>
					<legend>Classes</legend>
				</fieldset>
			</form>
	`);
	seniorClasses();
}