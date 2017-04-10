//function to create seven selects in '#senior' with the
//course options
function seniorClasses() {
	//text and values for the selects
	var labelVals = ['1', '2', '3', '4', '5', '6', '7'];
	var labelText = ["First Period", "Second Period", "Third Period", "Fourth Period", "Fifth Period", "Sixth Period", "Seventh Period"];
	
	//text and values for the options
	var classVals = ['default', 'math', 'art', 'science', 'lit', 'cooking', 'history', 'music'];
	var classText = ["Please Choose", "Pre-calc", "Sketching", "Chemistry", "Modern Literature", "Culinary Arts", "Acient Civilizations", "Chorus"];
	
	//use up all the texts to make all the selects and options
	for (var i = 0; i < labelVals.length; i++) {
		var sel = createSelect('#senior', labelVals[i], labelText[i]);
	}
	fillSelect('#senior', classVals, classText);
}

//helper function to create a label and select
//with an id and label text inside specified object
function createSelect(place, id, label) {
	$(place).append(`
			<label for=` + id + `>` + label + `</label>
			<select id=` + id + `></select>
			<br>
	`);
}

//helper function to fill all selects at a location with some values and text
function fillSelect(place, value, text) {
	for (var i = 0; i < value.length; i++) {
		$(place + ' select').append(`
				<option value=` + value[i] + `>` + text[i] + `</option>
		`);
	}
}

//function to gray out a selection that's already
//been selected
	//$('selected thing').attr('disabled', 'disabled')
$( ".selector" ).change(function() {
	//get selected value
	var value = $("#senior option:selected").val();
    if (value === '') return;
    
    theDiv.slideDown().removeClass("hidden");
    $("#senior option:selected").attr('disabled','disabled');
    $(this).val('');
});

