/**
 * @name Box
 * @description box that keeps the clues and lines connected
 * @class
 * @property {array of ints} walls - the four surrounding fences 
 */
class Box {
	/**
	 * @description creates a box inside the grid at certain coordinates (x, y) with or without a number clue inside; initializes its four walls
	 * @constructor
	 * @param {int} x - the x-coordinate of this box relative to the grid (0, 0 is the top left)
	 * @param {int} y - the y-coordinate of this box relative to the grid
	 * @param {boolean} hasNum - whether or not a clue is specified
	 * @param {int} [num] - the clue for this box
	 */
	constructor(x, y, hasNum, num) {
		this.x = x;
		this.y = y;
		
		if (hasNum === true) {
			this.hasNum = true;
			this.num = num;
		} else {
			this.hasNum = false;
		}
		
		this.walls = new Array(4);
		this.walls.fill(-1);
	}
	
	/**
	 * @name set
	 * @description gives this box a clue
	 * @param the number to set the clue to
	 */
	set(num) {
		this.num = num;
	}
	
	/**
	 * @name hasNum
	 * @description returns whether this box has a clue inside
	 * @function
	 * @returns clue or no clue?
	 */
	hasNum() {
		if (this.hasNum)
			return true;
	}
	
	/**
	 * @name linesEqualNum
	 * @description returns whether the number of walls filled in equals the clue
	 * @function
	 * @returns equal or not?
	 */
	linesEqualNum() {
		if (this.hasNum) {
			var wallsNum = 0;
			for (var i = 0; i < this.walls.length; i++) {
				if (this.walls[i] === 1) wallsNum++;
			}
			if (this.num === wallsNum)
				return true;
		}
		return false;
	}
}