import { Component, OnInit } from '@angular/core';
import { InternalOnboardingService } from '../internal-onboarding.service';

@Component({
  selector: 'onboqui-dot-navigation',
  templateUrl: './dot-navigation.component.html',
  styleUrls: ['./dot-navigation.component.css']
})
export class DotNavigationComponent implements OnInit {
  dotsIndices: number[] = [];
  activeIndex = 0;

  constructor(private service: InternalOnboardingService) {
  }

  ngOnInit() {
    this.dotsIndices = this.service.getAllIndices();
    this.activeIndex = this.service.getActiveIndex();
  }

  onClick(index: number) {
    this.service.showOverlay(index);
  }

}
