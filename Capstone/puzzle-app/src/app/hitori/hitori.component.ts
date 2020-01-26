import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hitori',
  templateUrl: './hitori.component.html',
  styleUrls: ['./hitori.component.scss']
})
export class HitoriComponent implements OnInit {
  puzzleData: Array<Array<number>>;
  userSolution: Array<Array<boolean | null>> = [];

  constructor() { }

  ngOnInit() {
    this.puzzleData = [
      [1, 2, 3, 4, 5],
      [2, 4, 5, 6, 3],
      [1, 4, 2, 3, 5],
      [2, 5, 4, 3, 2],
      [1, 5, 3, 2, 1]
    ];

    //initialize empty solution
    const size = this.puzzleData.length;
    for (let i = 0; i < size; i++) {
      this.userSolution.push(new Array<boolean | null>());
      for (let j = 0; j < size; j++) {
        this.userSolution[i][j] = null;
      }
    }
  }

  toggleCellColor(cellX, cellY) {
    const prev = this.userSolution[cellY][cellX];
    this.userSolution[cellY][cellX] = prev === null? false: prev === false? true: null;
  }
}
