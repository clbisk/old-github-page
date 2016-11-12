$(document).ready(function() {
	
	$('#belonging').progressbar({value: 5});
	$('#energy').progressbar({value: 95});
	$("input[type='radio']").checkboxradio();
		
	//wooh those microsoft powerpoint quality effects
	$('body').fadeOut(0);
	$('body').fadeIn(2000);
	 
//on submit, pulls up text event "introduction"
	$('#myForm').on('submit', function( event ) {
		event.preventDefault();
      
		//sets up form info as variables
        var name = $("input[type='text']").val();
        var pronoun = $("input:radio:checked").val();
      
        $('#myForm').remove();
        $('.screen').append("<div>Hi. My name's " + name + ", and today\'s my very first day of classes.</div>");
	});
	
});