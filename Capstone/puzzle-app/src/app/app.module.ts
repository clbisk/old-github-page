import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PuzzleSizeSelectorComponent } from './puzzle-size-selector/puzzle-size-selector.component';
import { PuzzleViewComponent } from './puzzle-view/puzzle-view.component';

const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'puzzle/:puzzle-type/:id', component: PuzzleViewComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PuzzleSizeSelectorComponent,
    LandingPageComponent,
    PuzzleViewComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }