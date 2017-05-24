$(document).ready(function() {
	
	$('.textBubble').hover(function() {
		$(this).fadeTo(20, .5);
	}, function() {
  	$(this).fadeTo(20, 1);
  });
	 
  $('.textBubble').click(function() {
  	$(this).remove();
		
		//redirects to main game
		window.location.replace("maingame.html");
	});
	
});