import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HitoriComponent } from './hitori.component';

describe('HitoriComponent', () => {
  let component: HitoriComponent;
  let fixture: ComponentFixture<HitoriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HitoriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HitoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
