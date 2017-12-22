/*eslint-env jquery */

function fillProgressbar(action) {
	//skill should be of type Skill
	if (action instanceof Action) {
		var skills = action.skills;
	}
}

/**
 * @name fillProgressbarClassic
 * @description old way to fill an outlined rectangle from left to right over time
 * @param id - the progressbar's id
 * @param value - the value to fill up to
 */
function fillProgressbarClassic( id, value, label ) {
	var thisProgressbar = $("#" + id);
	
	var thisMaxValue = thisProgressbar.progressbar("option", "max");
	if(thisMaxValue === null) {
		//this is not a progressbar
		console.error("This isn't a progressbarrrrrr");
	}
	var maxWidth = thisProgressbar.width();
	var calculatedWidth = (value / thisMaxValue) * maxWidth;
	
	//TODO: fix when the new progressbars get all confused
	thisProgressbar.children().animate({width: calculatedWidth}, {duration: 'slow'}).promise().done(function() {
		//make sure the animation is done before so it doesn't reverse the order and get all jumpy
		thisProgressbar.progressbar("value", value);
	});
	
	if (label !== null) {
		var labelText = label.html();
		//where our label number starts
		var labelNumberPos = labelText.lastIndexOf(" ") + 1;
		
		label.html(labelText.substring(0, labelNumberPos) + value + "/" + thisMaxValue);
	}
}