import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { workerGuardGuard } from './worker-guard.guard';

describe('workerGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => workerGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
