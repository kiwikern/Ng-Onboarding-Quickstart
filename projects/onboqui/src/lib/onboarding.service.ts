import { Injectable } from '@angular/core';
import { InternalOnboardingService } from './internal-onboarding.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  constructor(private internalService: InternalOnboardingService) { }

  public showOverlay(id: number) {
    return this.internalService.showOverlay(id);
  }
}
