$(document).ready(function() {
	
	$('#belonging').progressbar({value: 5});
	$('#energy').progressbar({value: 95});
	$("input[type='radio']").checkboxradio();
		
	//wooh those microsoft powerpoint quality effects
	$('body').fadeOut(0);
	$('body').fadeIn(2000);
	 
  //on submit, pulls up text event "introduction"
  //NOT WORKING
	$('#myForm').on('submit', function( event ) {
		event.preventDefault();
      
        $.ajax({
            url : $(this).attr('action') || window.location.pathname,
            type: "GET",
            data: $(this).serialize(),
            success: function (data) {
                $("#form_output").html(data);
            },
            error: function (jXHR, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
      
		alert( "IS IT WORKING" );
	});
	
});