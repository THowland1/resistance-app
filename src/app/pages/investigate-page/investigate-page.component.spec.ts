import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigatePageComponent } from './investigate-page.component';

describe('InvestigatePageComponent', () => {
  let component: InvestigatePageComponent;
  let fixture: ComponentFixture<InvestigatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
