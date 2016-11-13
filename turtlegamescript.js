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
      
        clearScreen();
        addPicNtext("<img src='https://www.wildgratitude.com/wp-content/uploads/2015/07/turtle-spirit-animal1.jpg'>", "Hi. My name's " + name + ", and today\'s my very first day of classes.");
	});
  
  function clearScreen() {
    $('.screen').empty();
  }
  
  function addPicNtext( picture, text ) {
    $('.screen').append("<div class='picNtext'></div>");
    $('.picNtext').append("<div class='scene'>" + picture + "</div>");
    $('.picNtext').append("<div class='story'>" + text + "</div>");
    
    //tryin dat type effect
    $(function(){
      $(".story").typed({
        strings: ["First sentence.", "Second sentence."],
        typeSpeed: 0
      });
    });
  }
	
});