import { Component, OnInit } from '@angular/core';
import { PuzzleService } from '../puzzle.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  active;

  constructor(private puzzleService: PuzzleService) { }

  ngOnInit() {
    this.puzzleService.getPuzzle("0000").subscribe(puzzle => {
      console.log(puzzle);
      console.log(puzzle.data);
    });
  }
}
