import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heyawake',
  templateUrl: './heyawake.component.html',
  styleUrls: ['./heyawake.component.scss']
})
export class HeyawakeComponent implements OnInit {
  size: number;
  roomBoundaries: Array<Room> = [];
  userSolution: Array<Array<boolean | null>> = [];

  constructor() { }

  ngOnInit() {
    this.size = 6;
    for (let i = 0; i < this.size; i++) {
      this.userSolution.push(new Array<boolean | null>(this.size));
    }

    this.roomBoundaries = [
      new Room([0,0], [2,1], 2),
      new Room([3,0], [5,1])
    ]
  }
}

export class Room {
  clue: number | null; //number of painted cells in the puzzle
  topLeft: [number, number]; //first cell in the room at the top left corner
  bottomRight: [number, number]; //last cell in the room at the bottom right corner

  constructor(topLeft: [number, number], bottomRight: [number, number], clue?: number) {
    this.topLeft = topLeft;
    this.bottomRight = bottomRight;
    this.clue = clue? clue: null;
  }
}