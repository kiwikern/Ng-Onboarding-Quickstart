import { InjectionToken } from '@angular/core';
import { OnboardingConfig } from './onboarding-config.interface';

export const OnboardingConfigToken = new InjectionToken<OnboardingConfig>('OnboardingConfig');
