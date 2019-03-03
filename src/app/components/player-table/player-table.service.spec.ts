import { TestBed } from '@angular/core/testing';

import { PlayerTableService } from './player-table.service';

describe('PlayerTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerTableService = TestBed.get(PlayerTableService);
    expect(service).toBeTruthy();
  });
});
