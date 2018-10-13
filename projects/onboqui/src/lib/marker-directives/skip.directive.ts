import { Directive, HostListener } from '@angular/core';
import { InternalOnboardingService } from '../internal-onboarding.service';

@Directive({
  selector: '[onboquiSkip]',
})
export class SkipDirective {

  constructor(private service: InternalOnboardingService) {
  }

  @HostListener('click')
  onClick() {
    this.service.hideOverlay(true);
  }

}
