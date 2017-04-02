//grid to keep the puzzle together
function Grid (c, r) {
	this.columns = c;
	this.rows = r;
	this.boxes = new Array(c);
	for (i = 0; i < c; i++) {
		this.boxes[c] = new Array(r);
		for (j = 0; j < r; j++) {
			this.boxes[c][r] = "weewoo";
		}
	}
	
}

Grid.prototype.set = function (c, r, clue) {
	this.boxes[c][r] = clue;
};

var g = new Grid(4, 5);
g.boxes[1] = "honk";
g.boxes[1][0] = "honk";
g.set(1, 0, "honk");


//box to keep the clues and lines connected
function Box () {
	
}

//those lines on the grid
function Fence (isFilled = "unknown") {
	this.value = isFilled;
}

Fence.prototype.set = function(clue) {
	this.value = clue;
};