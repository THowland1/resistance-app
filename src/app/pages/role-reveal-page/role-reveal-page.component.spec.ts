import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleRevealPageComponent } from './role-reveal-page.component';

describe('LandingPageComponent', () => {
  let component: RoleRevealPageComponent;
  let fixture: ComponentFixture<RoleRevealPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleRevealPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleRevealPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
