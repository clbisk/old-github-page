$(document).ready(function() {
	
    var progression = ['x'];
  
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
        addPicNtext("<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Chelonia_mydas_is_going_for_the_air.jpg/1280px-Chelonia_mydas_is_going_for_the_air.jpg'>", "Hi. My name's " + name + ", and today\'s my very first day of classes at Beloit Turtle College.");
      
	});
	
				$(document).on('click', '.next', function() {
          clearScreen();
          progression.push('x');
          pushNext();
        });
      
        $(document).on('submit', '.response', function( event ) {
          event.preventDefault();
          
          var selection = $("input:radio:checked").getAttribute('id');
          
          clearScreen();
          progression.push(selection);
          pushNext();
        });
  
  function clearScreen() {
    $('.screen').empty();
  }
  
  function addAnimation( animation, text ) {
    $('.screen').append("div class='animation'></div>");
  }
  
  function addCallResponse( text, response ) {
    $('.screen').append("<div class='callResponse'><form class='response' method='post'></form></div>");
    $('form').append("<div class='call'>" + text + "</div>");
    $('form').append("<div class='response'><fieldset></fieldset></div>");
    for (n = 0; n < response.length; n++) {
      $('fieldset').append("<label for='" + n + "'>" + response[n] + "</label>")
      $('fieldset').append("<input type='radio' name='responses' id='" + n + "'></br>");
    }
    $('form').append("<input type='submit' name='submit'>");
    
    $("input[type='radio']").checkboxradio();
  }
  
  function addPicNtext( picture, text ) {
    $('.screen').append("<div class='picNtext'></div>");
    $('.picNtext').append("<div class='scene'>" + picture + "</div>");
    $('.picNtext').append("<div class='story'></div>");
    $('.screen').append("<input type='submit' class='next' value='Next -->'></input>");
    
  //tryin dat type effect
  $(function(){
    $(".story").typed({
      strings: [text],
      typeSpeed: 0
     });
   });
  }
	
  function pushNext() {
    if ( progression.length == 2 ) {
      var choices = ["Go eat breakfast at commons",
                     "Go right to class",
                     "Sleep in   (Just 5 more minutes!)"]
      addCallResponse("What should I do first?", choices);
    }
    
    if ( progression.length == 3 ) {
      if ( progression[3] === '1' ) {
        //addPicNtext( <>, <> );
      } else if ( progression[3] === '2' ) {
        //addPicNtext( <>, <> );
      } else {
        //addPicNtext( <>, <> );
      }
    }
    
  }
  
});