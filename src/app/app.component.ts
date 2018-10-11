import { Component } from '@angular/core';
import { OnboardingService } from '../../projects/onboqui/src/lib/onboarding.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private service: OnboardingService) {}

  restartOnboarding() {
    this.service.showOverlay(1);
  }
}
