import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { regularUserGuardGuard } from './regular-user-guard.guard';

describe('regularUserGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => regularUserGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
