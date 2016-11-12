$(document).ready(function() {
	
	$('#belonging').progressbar({value: 5});
	$('#energy').progressbar({value: 95});
	$("input[type='radio']").checkboxradio();
		
	//wooh those microsoft powerpoint quality effects
	$('body').fadeOut(0);
	$('body').fadeIn(2000);
	 
	$('#submit').click( function() {
		$('#getName').submit();
	});
	
	$('#getName').submit( function( event ) {
		event.preventDefault();
		//pull up text event "introduction"
		alert( "IS IT WORKING" );
	});
	
});