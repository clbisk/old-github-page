//at startup
$(document).ready(function() {
	//bind event listener to selectors and buttons
	$('#screen').on('selectmenuchange', '.selector', menuchange);
	$('#screen').on('click', '.reset', reset);
	//$('#screen').on('submit', '#seniorform', seniorformsubmit);
	
	//start first scene
	seniorSelect();
});

