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
		var sel = createSelect('#senior div', labelVals[i], labelText[i]);
	}
	fillSelects('#senior', classVals, classText);

	//build jquery ui elements
	$('.selector').selectmenu();
}

//helper function to create a label and select
//with an id and label text inside specified object
function createSelect(place, id, label) {
	$(place).append(`
			<label for=` + id + `>` + label + `</label>
			<select class='selector' id=` + id + `></select>
			<br>
	`);
}

//helper function to fill all selects at a location with some values and text
function fillSelects(place, value, text) {
	for (var i = 0; i < value.length; i++) {
		$(place + ' select').append(`
				<option value=` + value[i] + `>` + text[i] + `</option>
		`);
	}
}

//function to gray out a selection that's already
//been selected
function menuchange() {
	alert('plea');
	
	//get selected value
	var value = $(this + " option:selected").val();
    if (value === 'default') return;
    $('.screen').append(value + " is selected.");
    
    //disable options of that value
    $(".selector option[value=" + value + "]").attr('disabled', true);
    $(".selector").selectmenu('refresh');
}