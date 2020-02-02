export abstract class Puzzle {
    id: string;
    data: string;
    solution: string;
    ratings: Array<number>;
  
    constructor(id, data, solution, ratings) {
      this.id = id;
      this.data = data;
      this.solution = solution;
      this.ratings = ratings;
    }
  }
  
  export class Hitori extends Puzzle {
    constructor(id, data, solution, ratings) { super(id, data, solution, ratings); }
  }
  
  export class Heyawake extends Puzzle {
    constructor(id, data, solution, ratings) { super(id, data, solution, ratings); }
  }