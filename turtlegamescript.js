$(document).ready(function() {
	
    var progression = [];
  
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
        pushNext();
	});
 
//gameover scenario
  if( $('#belonging').progressbar('value') <= 0 || $('#energy').progressbar('value') <= 0 ) {
    gameOver();
  }
	
//events that advance the story
		$(document).on('click', '.next', function() {
          clearScreen();
          progression.push('x');
          pushNext();
        });
      
        $(document).on('submit', '.response', function( event ) {
          event.preventDefault();
          
          var selection = $("input:radio:checked").attr('id');
          
          clearScreen();
          progression.push(selection);
          pushNext();
        });
  
        $(document).on('click', 'tryAgain', function() {
          clearScreen();
          progression = [];
          pushNext();
        });
 
 //v useful functions
  function clearScreen() {
    $('.screen').empty();
  }
  
  function addAnimation( animation, text ) {
    $('.screen').append("div class='animation'></div>");
  }
  
  function addCallResponse( text, response ) {
    $('.screen').append("<div class='callResponse'><form class='response' method='post'></form></div>");
    $('form').append("<div class='call'></div>");
    $('form').append("<div class='response'><fieldset></fieldset></div>");
    for (n = 0; n < response.length; n++) {
      $('fieldset').append("<label for='" + n + "'>" + response[n] + "</label>")
      $('fieldset').append("<input type='radio' name='responses' id='" + n + "'></br>");
    }
    $('form').append("<input type='submit' name='submit'>");
    
    $("input[type='radio']").checkboxradio();
    $(function(){
      $(".call").typed({
         strings: [text],
         typeSpeed: 0
      });
    });
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
	
//*****key function*****
  //controls the progression of the story and keeps the slides in order
  function pushNext() {
    if ( progression.length == 0 ) {
      addPicNtext("<img src='https://upload.wikimedia.org/wikipedia/commons/f/f5/Beloit_College_sign.JPG'>",
                  "Hi. My name's " + name + ", and today\'s my very first day of classes at Beloit Turtle College, a small liberal arts college for turtles like me!\nI said goodbye to my turtle mom and dad and moved in here more than a week ago for orientation. Now all I gotta do is survive college long enough to get my degree.");
    }
    
    else if ( progression.length == 1 ) {
      var choices = ["Go eat breakfast at commons",
                     "Go right to class",
                     "Sleep in   (Just 5 more minutes!)"]
      addCallResponse("What should I do first?", choices);
    }
    
    else if ( progression.length == 2 ) {
      if ( progression[1] === '0' ) {
        addPicNtext("<img src='http://www.landmarkmn.com/enews/0912/images/p_01.gif'>",
                    "They do say that breakfast is the most important meal of the day!");
        belongingUp();
        energyUp();
      } else if ( progression[1] === '1' ) {
        addPicNtext("<img src='http://www.findorff.com/wp-content/uploads/2014/04/beloit-2.jpg'>",
                    "Can't be late for my first day of college!");
        energyDown();
      } else {
        addPicNtext("<img src='http://66.media.tumblr.com/65fda358cc91a21e36d46f66330fc4aa/tumblr_o6j3ht8kSO1qjpd3ao1_1280.jpg'>",
                    "This way I'm sure to be rested for my first class...");
        energyUp();
      }
    }
    
    else if ( progression.length == 3) {
      
    }
    
  }
  
//makes things less confusing for me
  function belongingUp() {
    $('#belonging').progressbar('value', ($('#belonging').progressbar('value') + 7) );
  }
  function belonging2Up() {
    $('#belonging').progressbar('value', ($('#belonging').progressbar('value') + 14) );
  }
  function belongingDown() {
    $('#belonging').progressbar('value', ($('#belonging').progressbar('value') - 7) );
  }
  function belonging2Down() {
    $('#belonging').progressbar('value', ($('#belonging').progressbar('value') - 14) );
  }
  
  function energyUp() {
    $('#energy').progressbar('value', ($('#energy').progressbar('value') + 7) );
  }
  function energy2Up() {
    $('#energy').progressbar('value', ($('#energy').progressbar('value') + 14) );
  }
  function energyDown() {
    $('#energy').progressbar('value', ($('#energy').progressbar('value') - 7) );
  }
  function energy2Down() {
    $('#energy').progressbar('value', ($('#energy').progressbar('value') - 14) );
  }
 
//posts gameover scenario
  function gameOver() {
    clearScreen();
    addPicNtext("<img src='http://ichef.bbci.co.uk/wwfeatures/wm/live/624_351/images/live/p0/2g/hc/p02ghcq8.jpg'>",
                "Maybe college isn't for me... No, I just have to get back up and keep trying! ...If someone will just come flip me back over...");
    $('.screen').append("<input type='submit' class='tryAgain' value='Try Again?'></input>");
  }
  
});