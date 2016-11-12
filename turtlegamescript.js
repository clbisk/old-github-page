$(document).ready(function() {
	
	$('#belonging').progressbar({value: 5});
	$('#energy').progressbar({value: 95});
	$("input[type='radio']").checkboxradio();
		
	//wooh those microsoft powerpoint quality effects
	$('body').fadeOut(0);
	$('body').fadeIn(2000);
	 
	$('#myForm').submit( function( event ) {
      
        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            success: function (data) {
                alert('ok');
            }
        });
      
		event.preventDefault();
		//pull up text event "introduction"
		alert( "IS IT WORKING" );
	});
	
});