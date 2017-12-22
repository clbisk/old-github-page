/*eslint-env jquery */

$(document).ready( function() {
	$("button").button();
	$(":radio").checkboxradio();
	
	$("#add").on("click", addItem)
});

function addItem() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			//do something
		}
	};
	xhttp.open("GET", "items.txt", true);
	xhttp.send();
}