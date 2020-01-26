import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeyawakeRulesComponent } from './heyawake-rules.component';

describe('HeyawakeRulesComponent', () => {
  let component: HeyawakeRulesComponent;
  let fixture: ComponentFixture<HeyawakeRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeyawakeRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeyawakeRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
