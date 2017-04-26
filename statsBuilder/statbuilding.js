/**Prototype for when you such a li'l baby child**/
function Baby() {
	this.language;
	this.imagination;
	this.coordination;
}

Baby.prototype.birth = function () {
	this.language = (Math.random() * 2) + 1;
	this.imagination = (Math.random() * 2) + 1;
	this.coordination = (Math.random() * 2) + 1;
	
	$("#sidebar").append(`
			<div id=language>Language: ` + Math.trunc(this.language) + `</div>
			<div id=imagination>Imagination: ` + Math.trunc(this.imagination) + `</div>
			<div id=coordination>Coordination: ` + Math.trunc(this.coordination) + `</div>
	`);
	
}