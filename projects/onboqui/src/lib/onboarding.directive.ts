import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { InternalOnboardingService } from './internal-onboarding.service';

@Directive({
  selector: '[onboquiOnboardingId]'
})
export class OnboardingDirective implements OnInit, OnDestroy {

  @Input() onboquiText: string;

  @Input('onboquiOnboardingId') get id(): number {
    return this._id;
  }

  set id(id: number) {
    if (typeof id === 'string') {
      this._id = parseInt(id, 10);
    } else {
      this._id = id;
    }
  }

  private _id: number;
  overlayRef: OverlayRef;

  constructor(private el: ElementRef,
              private overlay: Overlay,
              private renderer: Renderer2,
              private service: InternalOnboardingService) {
  }

  ngOnInit() {
    this.service.registerOverlay(this);
  }

  ngOnDestroy() {
    this.hideOverlay();
    this.service.markOverlayAsHidden(this.id);
    this.service.destroyOverlay(this._id);
  }

  public showOverlay() {
    this.service.setText(this.onboquiText);
    this.overlayRef = this.createOverlay();
    this.setElementStyles();

    const onboardingPortal = new ComponentPortal(this.service.getComponent());
    this.overlayRef.attach(onboardingPortal);

    this.overlayRef.backdropClick().subscribe(() => {
      this.hideOverlay();
      this.service.markOverlayAsHidden(this.id);
    });
  }

  public hideOverlay() {
    if (this.overlayRef && this.overlayRef.hasAttached) {
      this.overlayRef.dispose();
    }
  }

  private setElementStyles() {
    this.overlayRef.detachments().subscribe(() => {
      this.renderer.removeClass(this.el.nativeElement, 'elevate');
      this.renderer.removeAttribute(this.el.nativeElement, 'id');
    });
    this.renderer.addClass(this.el.nativeElement, 'elevate');
    this.renderer.setAttribute(this.el.nativeElement, 'id', 'onboarding-active');
  }

  private createOverlay() {
    const positionStrategy = this.getPositionStrategy();
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    const overlayRef = this.overlay.create({positionStrategy, scrollStrategy, hasBackdrop: true, backdropClass: 'onboqui-backdrop'});
    return overlayRef;
  }

  private getPositionStrategy() {
    return this.overlay.position()
      .flexibleConnectedTo(this.el.nativeElement)
      .withPositions([
        {originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -10},
        {originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 10},
        {originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 10},
      ])
      .withGrowAfterOpen();
  }


}
