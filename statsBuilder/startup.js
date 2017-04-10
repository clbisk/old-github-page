//at startup
$(document).ready(function() {
	//bind event listener to created selectors
	$(document).on('change', 'select', menuchange);
	
	//start first scene
	seniorSelect();
});

