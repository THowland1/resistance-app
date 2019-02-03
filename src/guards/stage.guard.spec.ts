import { TestBed, async, inject } from '@angular/core/testing';

import { StageGuard } from './stage.guard';

describe('StageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StageGuard]
    });
  });

  it('should ...', inject([StageGuard], (guard: StageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
