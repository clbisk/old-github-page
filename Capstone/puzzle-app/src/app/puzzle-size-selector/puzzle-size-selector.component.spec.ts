import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleSizeSelectorComponent } from './puzzle-size-selector.component';

describe('PuzzleSizeSelectorComponent', () => {
  let component: PuzzleSizeSelectorComponent;
  let fixture: ComponentFixture<PuzzleSizeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzleSizeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleSizeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
