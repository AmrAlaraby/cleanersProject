import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userTypeOrGuard } from './user-type-or.guard';

describe('userTypeOrGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userTypeOrGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
