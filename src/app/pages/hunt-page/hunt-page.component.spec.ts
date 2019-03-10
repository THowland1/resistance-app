import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntPageComponent } from './hunt-page.component';

describe('HuntPageComponent', () => {
  let component: HuntPageComponent;
  let fixture: ComponentFixture<HuntPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuntPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuntPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
