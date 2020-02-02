import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HitoriRulesComponent } from './hitori-rules.component';

describe('HitoriRulesComponent', () => {
  let component: HitoriRulesComponent;
  let fixture: ComponentFixture<HitoriRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HitoriRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HitoriRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
