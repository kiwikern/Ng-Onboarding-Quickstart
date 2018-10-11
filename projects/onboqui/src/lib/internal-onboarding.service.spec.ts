import { TestBed } from '@angular/core/testing';

import { InternalOnboardingService } from './internal-onboarding.service';

describe('InternalOnboardingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InternalOnboardingService = TestBed.get(InternalOnboardingService);
    expect(service).toBeTruthy();
  });
});
