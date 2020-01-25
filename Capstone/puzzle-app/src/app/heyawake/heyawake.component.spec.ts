import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeyawakeComponent } from './heyawake.component';

describe('HeyawakeComponent', () => {
  let component: HeyawakeComponent;
  let fixture: ComponentFixture<HeyawakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeyawakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeyawakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
