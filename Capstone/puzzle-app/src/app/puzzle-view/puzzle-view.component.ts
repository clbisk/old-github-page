import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-puzzle-view',
  templateUrl: './puzzle-view.component.html',
  styleUrls: ['./puzzle-view.component.css']
})
export class PuzzleViewComponent implements OnInit {
  puzzleType: string;
  id: number;

  private routeSubscription;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.puzzleType = params['puzzle-type'];
      this.id = +params['id']
    });
  }

  ngOnDestroy() {
    //clean up clean up
    this.routeSubscription.unsubscribe();
  }
}
