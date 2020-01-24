import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-puzzle-size-selector',
  templateUrl: './puzzle-size-selector.component.html',
  styleUrls: ['./puzzle-size-selector.component.css']
})
export class PuzzleSizeSelectorComponent implements OnInit {

  @Input() puzzleType;
  constructor() { }

  ngOnInit() {
    console.log(puzzleSizes[this.puzzleType]);
  }

}

export const puzzleSizes = {"Hitori": ["5x5", "6x6", "7x7", "8x8", "9x9"], "Heyawake": ["9x9", "10x10", "11x11", "15x15"]};