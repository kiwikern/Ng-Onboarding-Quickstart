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
    const text = this.renderer.createText(this.service.getText());
    if (this.service.getText()) {
      this.renderer.appendChild(this.el.nativeElement, text);
    } else {
      console.error('Your onboarding view component has a TextContainer but no text was set. Set the directive oboquiText.');
    }
  }

}
