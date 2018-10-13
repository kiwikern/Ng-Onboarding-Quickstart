import { Component } from '@angular/core';
import { OnboardingService } from 'onboqui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showFirst = true;

  constructor(private service: OnboardingService) {
  }

  restartOnboarding() {
    this.service.showOverlay(1);
  }
}
