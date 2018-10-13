import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { InternalOnboardingService } from '../internal-onboarding.service';

@Directive({
  selector: '[onboquiTextContainer]'
})
export class TextContainerDirective implements OnInit {

  constructor(private el: ElementRef,
              private renderer: Renderer2,
              private service: InternalOnboardingService) {
  }

  ngOnInit() {
    if (this.service.getText()) {
      const text = this.renderer.createText(this.service.getText());
      this.renderer.appendChild(this.el.nativeElement, text);
    } else {
      console.warn('Your onboarding view component has a onboquiTextContainer but no text was set. Set the directive oboquiText.');
    }
  }

}
