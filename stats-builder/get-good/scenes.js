/*eslint-env jquery */


/**lays out some scenes that occur in the lifesim**/


function eventOptionSelected( event ) {
	$(".popup").hide();
	var selectedOption = event.target;
	
	event.data.handlerMethod(event.data.you, selectedOption);
}

//this is the one where you're a li'l kid dreaming about your
//future and you chose a "life goal" which can be adjusted later
function dreamJob( you ) {
	$('#screen').append(`
			<div class='popup'>
				<div class='popup-content'>
					<div class='popup-header'>Event: Dream</div>
					<div class='popup-body'>
						You lay sprawled out on the living room floor with crayons scattered in a circle around your page.
						As you daydream of a future years away, you make a crude drawing of
						<br/><br/>
						<div id='science' class='event-option'>An astronaut</div>
						<div id='sports' class='event-option'>A football player</div>
						<div id='tech' class='event-option'>A robot</div>
						<div id='art' class='event-option'>An artist</div>
						<div id='social' class='event-option'>A pop star</div>
					</div>
				</div>
			</div>
	`);
	
	$(".popup").show();
	$(".event-option").button();
	$(".event-option").on("click", {you: you, handlerMethod: dreamSelect}, eventOptionSelected);
}

function dreamSelect( you, selected ) {
	you.dream = selected.id;
	$("#hidableSkillsBar").prepend(`
		<div id='goal'>
			<div id='goal-flex'>
				<div id='goal-text'>Aspiration: ` + selected.id + `</div>
			</div>
		</div>`
	);
	
	learnTimeHours(you);
}

function learnTimeHours( you ) {
	you.trackTimeHours = true;
	you.day = 0;
	you.time = 5;
	
	const sleepPromise = sleepToChild();
	sleepPromise.then(function(result) {
		schoolStart( you );
	});
}

function sleepToChild() {
	return new Promise(function(resolve, reject) {
		$("#dream").click();
		resolve("child stage");
	});
}

function schoolStart( you ) {
	you.schoolToday = true;
	you.firstDayOfSchool = true;
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