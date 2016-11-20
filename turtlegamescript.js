$(document).ready(function() {
	
    var progression = [];
    var name;
  
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
        name = $("input[type='text']").val();
        var pronoun = $("input:radio:checked").val();
      
        clearScreen();
        pushNext();
	});
 
//gameover scenario
  $(document).on("progressbarchange", '#belonging', function() {
    gameOver();
  });
  $(document).on("progressbarchange", '#energy', function() {
    gameOver();
  });
  //if( $('#belonging').progressbar('value') <= 0 || $('#energy').progressbar('value') <= 0 ) {
  //  gameOver();
  //}
	
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
  
        $(document).on('click', '.tryAgain', function() {
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
  
  function fadeToBlackNback() {
    $('.screen').append("<div class='black'><img src='http://media.idownloadblog.com/wp-content/uploads/2016/04/black-screen.png'></div>");
    $('.black img').fadeOut(0);
    $('.black img').fadeIn('slow');
    $('.black img').fadeOut('slow');
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
                     "Sleep in   (Just 5 more minutes!)"];
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
    
    else if ( progression.length == 3 ) {
      addPicNtext("<img src='https://www.beloit.edu/reason/images/424590.jpg'>",
                  "I'm finally in my first ever college class! I'm already used to this atmosphere from doing informal FYI classes during orientation, but now it's official!\nI'll remember this day for the rest of--\nWell, I'll probably forget it relatively soon but it is nonetheless a monumental occasion!");
    }
    
    else if ( progression.length == 4 ) {
      var choices = ["Just say hello!",
                    "I don't know just don't say anything so you don't embarrass yourself",
                    "Complement the turtle's bowtie!"];
      addCallResponse("What should I say to the turtle sitting next to me?", choices);
    }
    
    else if ( progression.length == 5 ) {
      var initialResponse;
      if (progression[4] === '0') {
        initialResponse = "Oh, hi!";
        belongingUp();
      }
      else if (progression[4] === '1') {
        initialResponse = "Um, hi! I hope I'm not bothering you...";
        belongingDown();
      } else {
        initialResponse = "Oh dear, thank you so very much!";
        belonging2Up();
      }
      addPicNtext("<img src='http://4.bp.blogspot.com/-TUtBpS7fVsw/UKpbcgWasBI/AAAAAAAAAGg/4AIi6dT4g8w/s1600/smart+turtle.jpg'>",
                    "\"" + initialResponse + " My name's Sheldon. It's nice to meet you! I'm actually a tortoise, which means I'm completely a land-dweller.\nAnyways, how was your orientation week?\"");
    }
    
    else if ( progression.length == 6 ) {
      var choices = ["DK's",
                    "Commons",
                    "Java Joint",
                    "I don't need to eat lunch..."];
      addCallResponse("Class is over. Where should I go for lunch?", choices);
    }
    
    else if ( progression.length == 7 ) {
      var initialResponse;
      if (progression[6] === '0') {
        energy2Up();
        var choices = ["I'll get a wrap and go sit with friends",
                      "I'll just grab a to-go sandwich"];
        addCallResponse("What should I order?", choices);
      } else if (progression[6] === '1') {
        energy2Up();
        progression.push('x');
        progression.push('x');
        pushNext();
      } else if (progression[6] === '2') {
        energy2Up();
        var choices = ["I can get a sack lunch to-go and go study a bit",
                      "I'll grab a bagel and a coffee"];
        addCallResponse("What should I order?", choices);
      } else {
        energyDown();
        progression.push('x');
        progression.push('x');
        pushNext();
      }
    }
    
    else if ( progression.length == 8 ) {
      if (progression[6] === '0') {
        if (progression[7] === '0') {
          belonging2Up();
        } else {
          energyUp();
        }
      } else {
        if (progression[7] === '0') {
          energyUp();
        } else {
          energy2Up();
        }
      }
      progression.push('x');
      pushNext();
    }
    
    else if ( progression.length == 9 ) {
      $('body').fadeOut(1000);
      $('body').fadeIn(1000);
      addPicNtext("<img src='http://www.findorff.com/wp-content/uploads/2014/04/beloit-1.jpg'>",
                  "Classes for the day are over, thank goodness.\nIt was a long but eventful day.");
    }
    
    else if ( progression.length == 10 ) {
      var choices = ["Study",
                    "Buy textbooks",
                    "Go to milkshake monday"];
      addCallResponse("What should I do next?", choices);
    }
    
    else if ( progression.length == 11 ) {
      if (progression[10] === '0') {
        energy2Down();
        belongingUp();
      } else if (progression[10] === '1') {
        belongingUp();
        energyDown();
      } else {
        belonging2Up();
        energy2Down();
      }
      progression.push('x');
      pushNext();
    }
    
    else if ( progression.length == 12 ) {
      $('body').fadeOut(1000);
      $('body').fadeIn(1000);
      addPicNtext("<img src='http://66.media.tumblr.com/65fda358cc91a21e36d46f66330fc4aa/tumblr_o6j3ht8kSO1qjpd3ao1_1280.jpg'>",
                  "Whew, I'm pooped. Fist day of college: check.");
    }
    
    else if ( progression.length == 13 ) {  
      $('body').fadeOut(1000);
      $('.DayOtheWeek').empty();
      $('.DayOtheWeek').append("Tuesday");
      $('body').fadeIn(1000);
      addPicNtext("<img src='http://66.media.tumblr.com/65fda358cc91a21e36d46f66330fc4aa/tumblr_o6j3ht8kSO1qjpd3ao1_1280.jpg'>",
                  "Ready for my second day! Today I've got sculpting and my FYI: The Wonder That is India.");
    }
    
    else if ( progression.length == 14 ) {
      var choices = ["Eat breakfast in commons",
                    "Eat a toaster pastry",
                    "Skip breakfast"];
      addCallResponse("What should I do first?", choices);
    }
    
    else if ( progression.length == 15 ) {
      if (progression[14] === '0') {
        addPicNtext("<img src='http://www.landmarkmn.com/enews/0912/images/p_01.gif'>",
                    "I gotta take care of myself.")
        energyUp();
        belongingUp();
      } else if (progression[14] === '1') {
        addPicNtext("<img src='http://www.cbc.ca/stevenandchris/content/images/homemade_toaster_pastries1.jpg'>",
                    "Easy peasy.");
        energy2Up();
      } else {
        energy2Down();
        progression.push('x');
        pushNext();
      }
    }
    
    else if ( progression.length == 16 ) {
      addPicNtext("<img src='http://www.findorff.com/wp-content/uploads/2014/04/beloit-3.jpg'>",
                  "Alright, time for FYI.");
    }
    
    else if ( progression.length == 17 ) {
      var choices = ["Empty table",
                    "Table with turtles I've met before",
                    "Table with new turtles"];
      addCallResponse("Where should I sit?", choices);
    }
    
    else if ( progression.length == 18 ) {
      if (progression[17] === '0') {
        belonging2Down();
      } else if (progression[17] === '1') {
        belongingUp();
        energyUp();
      } else {
        belonging2Up();
        energyDown();
      }
      addPicNtext("<img src='http://www.bollywoodshaadis.com/img/article-201441004572417844000.jpg'>",
                  "Today we're learning about the differences in marriage arrangements between north India and south India and what it means for society.");
    }
    
    else if ( progression.length == 19 ) {
      addPicNtext("<img src='http://www.clipartkid.com/images/242/cell-phone-icon-png-xw9bYK-clipart.png'>",
                  "Text: \"Wanna get something to eat?\"");
    }
    
    else if ( progression.length == 20 ) {
      var choices = ["No, I gotta study",
                    "Yeah!"];
      addCallResponse("Should I go?", choices);
    }
    
    else if ( progression.length == 21 ) {
      var choices = ["I heard there was a lecture by the Sea Turtle department today!",
                    "Go back to the dorm"];
      addCallResponse("Classes are over, what should I do?", choices);
    }
    
    else if ( progression.length == 22 ) {
      if (progression[21] === '0') {
        belonging2Up();
        energy2Down();
      } else {
        energyUp();
      }
      $('body').fadeOut(1000);
      $('body').fadeIn(1000);
      var choices = ["Go to bed",
                    "Stay up watching TurtleFlix with friends"];
      addCallResponse("It's gotten pretty late. What should I do now?", choices);
    }
    
    else if ( progression.length == 23 ) {
      if (progression[22] === '0') {
        energy2Up();
      } else {
        belonging2Up();
        energyDown();
      }
      $('body').fadeOut(1000);
      $('.DayOtheWeek').empty();
      $('.DayOtheWeek').append("Wednesday");
      $('body').fadeIn(1000);
      addPicNtext("<img src='http://66.media.tumblr.com/65fda358cc91a21e36d46f66330fc4aa/tumblr_o6j3ht8kSO1qjpd3ao1_1280.jpg'>",
                 "Wednesday! What's in store today?");
    }
    
    else if ( progression.length == 24 ) {
      addPicNtext("<img src='http://www.clipartkid.com/images/242/cell-phone-icon-png-xw9bYK-clipart.png'>",
                  "Text: \"Let's hang out after class!\"");
    }
      
    else if ( progression.length == 25 ) {
      var choices = ["No, I gotta study",
                    "Yeah!"];
      addCallResponse("Should I go?", choices);
    }
      
    else if ( progression.length == 26 ) {
      if (progression[25] === '1') {
        belonging2Up();
        energyDown();
      }
      $('body').fadeOut(1000);
      $('body').fadeIn(1000);
      var choices = ["Use the kitchen to make your own dinner!",
                    "Go to commons with friends",
                    "Stay in the room and study"];
      addCallResponse("Dinner time!", choices)
    }
      
    else if ( progression.length == 27 ) {
      if (progression[26] === '0') {
        addPicNtext("<img src='http://greatist.com/sites/default/files/styles/article_main/public/29%20final_0.jpg?itok=bfmRlC7X'>",
                   "I made food in a mug! Now I feel like a real adult.");
        energyUp();
        belongingUp();
      } else if (progression[26] === '1') {
        addPicNtext("<img src='http://www.landmarkmn.com/enews/0912/images/p_01.gif'>",
                   "Having food with friends always puts me in a good mood.");
        energyUp();
        belonging2Up();
      } else {
        addPicNtext("<img src='https://nyoobserver.files.wordpress.com/2015/04/lots-of-books.jpg?quality=80'>",
                   "I'm already shutting myself away and it's only the first week...");
        energy2Down();
        belongingDown();
      }
    }
      
    else if ( progression.length == 28 ) {
      var choices = ["I'll invite friends from class to study with me!",
                     "I need to focus; I should study alone"];
      addCallResponse("Time to study!", choices);
    }
      
    else if ( progression.length == 29 ) {
      if (progression[28] === '0') {
        belonging2Up();
        energy2Down();
      } else {
        energyUp();
        belongingDown();
      }
      var choices = ["Yeah!",
                    "Nah, I should turn in early"];
      addCallResponse("There's a late-night showing of Finding Dory tonight! Should I go?", choices);
    }
    
    else if ( progression.length == 30 ) {
      if (progression[29] === '0') {
        belonging2Up();
      } else {
        energy2Up();
      }
      $('body').fadeOut(1000);
      $('.DayOtheWeek').empty();
      $('.DayOtheWeek').append("Thursday");
      $('body').fadeIn(1000);
      addPicNtext("<img src='http://66.media.tumblr.com/65fda358cc91a21e36d46f66330fc4aa/tumblr_o6j3ht8kSO1qjpd3ao1_1280.jpg'>",
                 "Thursday. I wonder what'll happen today?");
    }
    
    else if ( progression.length == 31 ) {
      var choices = ["Eat breakfast in commons",
                    "Eat a toaster pastry",
                    "Skip breakfast"];
      addCallResponse("What should I do for breakfast?", choices);
    }
    
    else if ( progression.length == 32 ) {
      if (progression[31] === '0') {
        addPicNtext("<img src='http://www.landmarkmn.com/enews/0912/images/p_01.gif'>",
                    "I gotta take care of myself.")
        energyUp();
        belongingUp();
      } else if (progression[31] === '1') {
        addPicNtext("<img src='http://www.cbc.ca/stevenandchris/content/images/homemade_toaster_pastries1.jpg'>",
                    "Easy peasy.");
        energy2Up();
      } else {
        energy2Down();
        progression.push('x');
        pushNext();
      }
    }
    
    else if ( progression.length == 33 ) {
      addPicNtext("<img src='http://www.findorff.com/wp-content/uploads/2014/04/beloit-3.jpg'>",
                  "Gotta head to FYI now.");
    }
      
    else if ( progression.length == 34 ) {
      var choices = ["I'll sit alone",
                    "Same table as last time",
                    "Table with totally new turtles"];
      addCallResponse("Where should I sit this time?", choices);
    }
    
    else if ( progression.length == 35 ) {
      if (progression[34] === '0') {
        belonging2Down();
      } else if (progression[17] === '1') {
        belongingUp();
        energyUp();
      } else {
        belonging2Up();
        energyDown();
      }
      addPicNtext("<img src='http://www.citizenship-aei.org/wp-content/uploads/Testing.jpg'>",
                  "Oh no! There's a pop quiz!");
    }
                  
    else if ( progression.length == 36 ) {
      var choices = ["Red, white, and blue",
                    "Orange, white, and green",
                    "Orange, white, and blue",
                    "There aren't three stripes on the Indian flag!"];
      addCallResponse("Question 1:  What colors are the three stripes on the Indian flag?", choices);
    }
      
    else if ( progression.length == 37 ) {
      if (progression[36] === '1') {
        energyUp();
        belongingUp();
        addPicNtext("<img src='http://www.clipartbest.com/cliparts/niE/LL8/niELL86iA.png'>",
                   "Yep, that's right!");
      } else {
        energyDown();
        belongingDown();
        addPicNtext("<img src='https://cdn.pixabay.com/photo/2012/04/12/20/12/x-30465_1280.png'>",
                   "Incorrect!");
      }
    }
      
    else if ( progression.length == 38 ) {
      var choices = ["Van Halen",
                    "Van Damme",
                    "Van Helsing",
                    "Van Galder"];
      addCallResponse("Question 2: What is the name of the bus line that goes to Chicago and the O'Hare Airport?", choices);
    }
      
    else if ( progression.length == 39 ) {
      if (progression[38] === '3') {
        energyUp();
        belongingUp();
        addPicNtext("<img src='http://www.clipartbest.com/cliparts/niE/LL8/niELL86iA.png'>",
                   "Yep, that's right!");
      } else {
        energyDown();
        belongingDown();
        addPicNtext("<img src='https://cdn.pixabay.com/photo/2012/04/12/20/12/x-30465_1280.png'>",
                   "Incorrect!");
      }
    }
      
    else if ( progression.length == 40 ) {
      var choices = ["Mumbai",
                    "Bangalore",
                    "New Delhi",
                    "Kolkata"];
      addCallResponse("Question 3:  What is the capital of India?", choices);
    }
      
    else if ( progression.length == 41 ) {
      if (progression[40] === '2') {
        energyUp();
        belongingUp();
        addPicNtext("<img src='http://www.clipartbest.com/cliparts/niE/LL8/niELL86iA.png'>",
                   "Yep, that's right!");
      } else {
        energyDown();
        belongingDown();
        addPicNtext("<img src='https://cdn.pixabay.com/photo/2012/04/12/20/12/x-30465_1280.png'>",
                   "Incorrect!");
      }
    }
    
    else if ( progression.length == 42 ) {
      var choices = ["Math, Arts, Psychology, Science, and Lit",
                    "Systems, Arts, Behavior, the Universe, and Texts",
                    "Systems, Arts, Health, Social Science, and Texts",
                    "There are more than five domains!"];
      addCallResponse("Question 1:  Question 4: What are the five \"Domains\" of a liberal arts education at Beloit?", choices);
    }
      
    else if ( progression.length == 43 ) {
      if (progression[42] === '1') {
        energyUp();
        belongingUp();
        addPicNtext("<img src='http://www.clipartbest.com/cliparts/niE/LL8/niELL86iA.png'>",
                   "Yep, that's right!");
      } else {
        energyDown();
        belongingDown();
        addPicNtext("<img src='https://cdn.pixabay.com/photo/2012/04/12/20/12/x-30465_1280.png'>",
                   "Incorrect!");
      }
    }
      
    else if ( progression.length == 44 ) {
      addPicNtext("<img src='http://www.citizenship-aei.org/wp-content/uploads/Testing.jpg'>",
                  "Phew, that was a tough quiz! Some of it was even just about Beloit in general; although I guess that's to be expected in an FYI, since FYI is here not only to teach us about the given topic, but also about being a proper college student here at Beloit.");
    }
      
    else if ( progression.length == 45 ) {
      var choices = ["Take a swim at the Sports Center!",
                    "Chill out in the dorm",
                    "Play frisbee on the Quad"];
      addCallResponse("What should I do for the rest of the day?", choices);
    }
      
    else if ( progression.length == 46 ) {
      if (progression[45] === '0') {
        energy2Down();
        belonging2Up();
        addPicNtext("<img src='http://www.hudsonvalleygoodstuff.com/wp-content/uploads/2011/08/6a0120a7acde64970b014e8a87083a970d.jpg'>",
                   "I do love a good swim!");
      } else if (progression[45] === '0') {
        addPicNtext("<img src='http://66.media.tumblr.com/65fda358cc91a21e36d46f66330fc4aa/tumblr_o6j3ht8kSO1qjpd3ao1_1280.jpg'>",
                   "It's nice to just relax.");
        energy2Up();
      } else {
        addPicNtext("<img src='http://collegeboundmentor.com/wp-content/uploads/2013/04/cbm_lisa_beloit_quad.jpg'>",
                   "There are always some turtles playing frisbee out here for some reason. Might as well join in!");
        energy2Down();
        belonging2Up();
      }
    }
      
    else if ( progression.length == 47 ) {
      $('body').fadeOut(1000);
      $('.DayOtheWeek').empty();
      $('.DayOtheWeek').append("Friday");
      $('body').fadeIn(1000);
      addPicNtext("<img src='http://66.media.tumblr.com/65fda358cc91a21e36d46f66330fc4aa/tumblr_o6j3ht8kSO1qjpd3ao1_1280.jpg'>",
                 "It's Friday! Yes! I've almost made it through a whole week of classes at Beloit. It's been tiring, but I've met a lot of really nice turtles. None of them are like the turtles I used to hang out with at home, but I'm glad; it means I'm meeting really unique turtles and getting new perspectives. Besides, I'll get used to life here soon, and then everything will be much more relaxed. I'm already seeing Beloit Turtle College as my new home.");
    }
    
    else if ( progression.length == 48 ) {
      var choices = ["DK's",
                    "Commons",
                    "Java Joint",
                    "I don't need to eat lunch..."];
      addCallResponse("What's for lunch today?", choices);
    }
    
    else if ( progression.length == 49 ) {
      var initialResponse;
      if (progression[48] === '0') {
        energy2Up();
        var choices = ["I'll get a wrap and go sit with friends",
                      "I'll just grab a to-go sandwich"];
        addCallResponse("What should I order?", choices);
      } else if (progression[48] === '1') {
        energy2Up();
        progression.push('x');
        progression.push('x');
        pushNext();
      } else if (progression[48] === '2') {
        energy2Up();
        var choices = ["I can get a sack lunch to-go and go study a bit",
                      "I'll grab a bagel and a coffee"];
        addCallResponse("What should I order?", choices);
      } else {
        energyDown();
        progression.push('x');
        progression.push('x');
        pushNext();
      }
    }
    
    else if ( progression.length == 50 ) {
      if (progression[6] === '0') {
        if (progression[7] === '0') {
          belonging2Up();
        } else {
          energyUp();
        }
      } else {
        if (progression[7] === '0') {
          energyUp();
        } else {
          energy2Up();
        }
      }
      progression.push('x');
      pushNext();
    }
      
    else if ( progression.length == 51 ) {
      $('body').fadeOut(1000);
      $('body').fadeIn(1000);
      var choices = ["Go see some live student music at C-haus",
                    "Go party!",
                    "Chill at the wall",
                    "I'm exhausted! Time for a looong nap"];
      addCallResponse("Classes went well! Now what should I do?", choices);
    }
      
    else if ( progression.length == 52 ) {
      if (progression[51] === '0') {
        belonging2Up();
        energyDown();
      } else if (progression[51] === '1') {
        belonging2Up();
        energyDown();
      } else if (progression[51] === '2') {
        belonging2Up();
        energyDown();
      } else {
        energy2Up();
      }
      $('body').fadeOut(500).delay(200).fadeIn(500);
      $('body').fadeOut(500).delay(200).fadeIn(500);
      addPicNtext("<img src='http://www.aaanything.net/wp-content/uploads/2013/04/happy_turtle_look_mom_no_hands.jpg'>",
                  "You did it!! You survived college!");
    }
      
    else if ( progression.length == 53 ) {
      $('.screen').append("<div class='bigFont'>Thanks for playing!<br><br>This game was created for the 2016 Beloit Being Here Festival.<br>Story by Rose Stahl and Cecilia Bisk<br>Programmed by Cecilia Bisk</div>");
    }
      
    //else if ( progression.length == 23413456) {
    //  var choices = [];
    //  addCallResponse("", choices);
    //}
    //else if ( progression.length == 23413456) {
    //  if progression[2]
    //  addPicNtext("<img src=''>",
    //             "");
    //}
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
    $('body').fadeOut(500).delay(200).fadeIn(500);
    $('body').fadeOut(500).delay(200).fadeIn(500);
    addPicNtext("<img src='http://ichef.bbci.co.uk/wwfeatures/wm/live/624_351/images/live/p0/2g/hc/p02ghcq8.jpg'>",
                "Maybe college isn't for me... No, I just have to get back up and keep trying! ...If someone will just come flip me back over...");
    $('.screen').append("<input type='submit' class='tryAgain' value='Try Again?'></input>");
  }
  
});