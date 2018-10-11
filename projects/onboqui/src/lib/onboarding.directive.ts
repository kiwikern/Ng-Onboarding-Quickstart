import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { InternalOnboardingService } from './internal-onboarding.service';

@Directive({
  selector: '[onboquiOnboarding]'
})
export class OnboardingDirective implements OnInit, OnDestroy {

  @Input() onboquiText: string;

  @Input() get onboquiId(): number {
    return this._onboquiId;
  }

  set onboquiId(id: number) {
    if (typeof id === 'string') {
      this._onboquiId = parseInt(id, 10);
    } else {
      this._onboquiId = id;
    }
  }

  private _onboquiId: number;
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
    this.service.hideOverlay(this._onboquiId);
    this.service.destroyOverlay(this._onboquiId);
  }

  public showOverlay() {
    this.service.setText(this.onboquiText);
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.el.nativeElement)
      .withPositions([
        {originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -10},
        {originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 10},
        {originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 10},
      ])
      .withGrowAfterOpen();
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    const overlayRef = this.overlay.create({positionStrategy, scrollStrategy, hasBackdrop: true, backdropClass: 'my-backdrop'});
    this.overlayRef = overlayRef;
    overlayRef.detachments().subscribe(() => {
      this.renderer.removeClass(this.el.nativeElement, 'elevate');
      this.renderer.removeAttribute(this.el.nativeElement, 'id');
    });

    const onboardingPortal = new ComponentPortal(this.service.getComponent());
    overlayRef.attach(onboardingPortal);
    this.renderer.addClass(this.el.nativeElement, 'elevate');
    this.renderer.setAttribute(this.el.nativeElement, 'id', 'onboarding-active');
    overlayRef.backdropClick().subscribe(() => this.service.hideOverlay(this._onboquiId));
  }

  public hideOverlay() {
    if (this.overlayRef && this.overlayRef.hasAttached) {
      this.overlayRef.dispose();
    }
  }




}
