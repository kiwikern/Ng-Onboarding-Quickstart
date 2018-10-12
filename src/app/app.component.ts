import { Component } from '@angular/core';
import { OnboardingService } from '../../projects/onboqui/src/lib/onboarding.service';
import { InternalOnboardingService } from '../../projects/onboqui/src/lib/internal-onboarding.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showFirst = true;

  constructor(private service: OnboardingService, private s: InternalOnboardingService) {}

  restartOnboarding() {
    this.service.showOverlay(1);
  }
}
