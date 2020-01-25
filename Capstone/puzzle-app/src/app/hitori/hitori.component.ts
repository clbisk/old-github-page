import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hitori',
  templateUrl: './hitori.component.html',
  styleUrls: ['./hitori.component.scss']
})
export class HitoriComponent implements OnInit {
  puzzleData: Array<Array<number>>;

  constructor() { }

  ngOnInit() {
    this.puzzleData = [
      [1, 2, 3, 4, 5],
      [2, 4, 5, 6, 3],
      [1, 4, 2, 3, 5],
      [2, 5, 4, 3, 2],
      [1, 5, 3, 2, 1]
    ];
  }

}
