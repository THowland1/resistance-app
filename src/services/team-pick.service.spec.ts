import { TestBed } from '@angular/core/testing';

import { TeamPickService } from './team-pick.service';

describe('TeamPickService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeamPickService = TestBed.get(TeamPickService);
    expect(service).toBeTruthy();
  });
});
