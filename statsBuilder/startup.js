//at startup
$(document).ready(function() {
	//bind event listener to selectors
	$('#screen').on('selectmenuchange', '.selector', menuchange);

	//start first scene
	seniorSelect();
});

