/**General functions**/
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
	//get selected value and its id
	var value = $(this).val();
	var id = $(this).attr('id');
	
	//reset previous selection
	$(".selector option[value=" + prev[id] + "]").removeAttr('disabled');
    
    //store previous
    prev[id] = $(this).val();
    $('.selector').selectmenu('refresh');
    	
    //disable options of that value (but not default~)
    if (value === 'default') return;
    
    $(".selector option[value=" + value + "]").attr('disabled', true);
    $(".selector").selectmenu('refresh');
}

//when reset button is clicked, set all options back to default
function reset() {
	$(".selector option").removeAttr('disabled');
	$('.selector').val('default');
	$(".selector").selectmenu('refresh');
}

/**Senior class forms**/
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
	prev = [];
	for (var i = 0; i < labelVals.length; i++) {
		createSelect('#senior div', labelVals[i], labelText[i]);
	}
	fillSelects('#senior', classVals, classText);

	//build jquery ui elements
	$('.selector').selectmenu();
}

//when senior class form is submitted, store chosen classes
	//then inform which classes were selected
function seniorformsubmit(event) {
	event.preventDefault();
	classes = [];
	$('#seniorform').on('submit', function() {
		for (var i = 0; i < 7; i++) {
			classes[i] = $('#' + (i + 1) + " option:selected").val();
		}
	});
	
	//get rid of form and display selected classes on screen
	$('#screen').html(`<div id='schedule'>Selected classes:<br><br></div>`);
	for (var i = 0; i < 7; i++) {
		$('#schedule').append(`
				<div>Period ` + (i+1) + `: ` + classes[i] + `<div>
		`);
	}
}