//function to create seven selects in '#senior' with the
//course options
function seniorClasses() {
	$('#screen').append(`
			<form id='senior' class='classes'>
				<fieldset>
					<legend>Classes</legend>
				</fieldset>
			</form>
	`);
	var labelVals = ['1', '2', '3', '4', '5', '6', '7'];
	var labelText = ["First Period", "Second Period", "Third Period", "Fourth Period", "Fifth Period", "Sixth Period", "Seventh Period"];
	for (i = 0; i < labelVals.length; i++) {
		var sel = createSelect('#screen fieldset', labelVals[i], labelText[i]);
		var classVals = ['default', 'math', 'art', 'science', 'lit', 'cooking', 'history', 'music'];
		var classText = ["Please Choose", "Pre-calc", "Sketching", "Chemistry", "Modern Literature", "Culinary Arts", "Acient Civilizations", "Chorus"];
		fillSelect(sel1, classVals, classText);
	}
}

//helper function to create a label and select
//with an id and label text inside specified object
function createSelect(place, id, label) {
	for (i = 0; i < id.length; i++) {
		$(place).append(`
				<label for=` + id + `>` + label + `</label>
				<select id=` + id + `></select>
		`);
		return $(place + ' select');
	}
}

//helper function to fill a select with some values and text
function fillSelect(place, value, text) {
	for (i = 0; i < value.length; i++) {
		place.append(`
				<option value=` + value[i] + `>` + text[i] + `</option>
		`);
	}
}

//function to gray out a selection that's already
//been selected
	//$('selected thing').attr('disabled', 'disabled')
