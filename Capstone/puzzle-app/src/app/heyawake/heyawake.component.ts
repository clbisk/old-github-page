import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heyawake',
  templateUrl: './heyawake.component.html',
  styleUrls: ['./heyawake.component.scss']
})
export class HeyawakeComponent implements OnInit {
  size: number;
  puzzleData: Array<Array<boolean | null>> = [];

  constructor() { }

  ngOnInit() {
    this.size = 5;
    for (let i = 0; i < this.size; i++) {
      this.puzzleData.push(new Array<boolean | null>(this.size));
    }
  }
}
