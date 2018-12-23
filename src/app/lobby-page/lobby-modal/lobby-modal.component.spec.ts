import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyModalComponent } from './lobby-modal.component';

describe('LobbyModalComponent', () => {
  let component: LobbyModalComponent;
  let fixture: ComponentFixture<LobbyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LobbyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
