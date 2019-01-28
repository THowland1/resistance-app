import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionInfoBarComponent } from './session-info-bar.component';

describe('SessionInfoBarComponent', () => {
  let component: SessionInfoBarComponent;
  let fixture: ComponentFixture<SessionInfoBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionInfoBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionInfoBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
