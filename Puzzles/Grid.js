/**
 * @name Grid
 * @description the grid containing and managing the puzzle
 * @class
 * @property {2d array of ints} boxes - keeps track of all the boxes in the grid
 */
class Grid {
	/**
	 * @description creates a grid with a given number of columns and rows; initializes empty boxes at all positions
	 * @constructor
	 * @param {int} c - number of columns
	 * @param {int} r - number of rows
	 */
	constructor(c, r) {
		this.columns = c;
		this.rows = r;

		this.boxes = new Array(r);
		for (var i = 0; i < r; i++) {
			this.boxes[r] = new Array(c);

			//initiates all boxes as unknown
			for (var j = 0; j < c; j++) {
				//-1 indicates an unknown number of surrounding lines
				this.boxes[r][c] = new Box(r, c, false);
			}
		}
	}

	/**
	 * @name set
	 * @description adds a clue to a box
	 * @function
	 * @param {int} c - column of the box the clue is for
	 * @param {int} r - row of the box the clue is for
	 * @param {int} clue - the number value indicating the number of lines surrounding this box
	 * @returns {boolean} indicates whether the clue was added successfully
	 */
	set(c, r, clue) {
		this.boxes[r][c] = clue;
		return true;
	}

	/**
	 * @name get
	 * @description gets the clue from a box, if any
	 * @function
	 * @returns {int} the clue in the box (-1 indicates no clue was in the box)
	 */
	get(c, r) {
		return this.boxes[r][c];
	}

	/**
	 * @name check
	 * @description checks whether all the rules of a slitherlink are followed in this grid
	 * @function
	 * @returns {boolean} value of the check
	 */
	check() {
		return this.linesFormLoop() && this.noThreeways() && this.linesEqualNums();
	}

	/**
	 * @name linesFormLoop()
	 * @description checks whether all of this grid's lines are connected head to tail
	 * @function
	 * @returns {boolean} value of the check
	 */
	linesFormLoop() {
		return false;
	}

	/**
	 * @name noThreeways()
	 * @description checks that none of this grid's points are shared by three or more lines
	 * @function
	 * @returns {boolean} value of the check
	 */
	noThreeways() {
		return false;
	}

	/**
	 * @name linesEqualNums()
	 * @description checks whether all of this grid's number clues are surrounded by that number of lines
	 * @function
	 * @returns {boolean} value of the check
	 */
	linesEqualNums() {
		return false;
	}
	
	/**
	 * @name solve()
	 * @description solves the slitherlink
	 * @function
	 * @returns {boolean} whether the puzzle was solved successfuly
	 */
	solve() {
		return false;
	}
	
}

var g = new Grid(4, 5);
g.set(1, 0, "honk");

alert();