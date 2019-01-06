import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPickPageComponent } from './team-pick-page.component';

describe('TeamPickPageComponent', () => {
  let component: TeamPickPageComponent;
  let fixture: ComponentFixture<TeamPickPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPickPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPickPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
