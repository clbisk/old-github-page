import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppComponent } from './app.component';
import { PuzzleSizeSelectorComponent } from './puzzle-size-selector/puzzle-size-selector.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PuzzleViewComponent } from './puzzle-view/puzzle-view.component';

@NgModule({
  declarations: [
    AppComponent,
    PuzzleSizeSelectorComponent,
    LandingPageComponent,
    PuzzleViewComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
