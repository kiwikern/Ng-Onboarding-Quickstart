import { Directive, HostListener } from '@angular/core';
import { InternalOnboardingService } from '../internal-onboarding.service';

@Directive({
  selector: '[onboquiClose]',
})
export class CloseDirective {

  constructor(private service: InternalOnboardingService) {
  }

  @HostListener('click')
  onClick() {
    this.service.hideOverlay();
  }

}
