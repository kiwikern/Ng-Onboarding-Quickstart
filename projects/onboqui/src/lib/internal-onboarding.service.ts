import { Inject, Injectable } from '@angular/core';
import { OnboardingDirective } from './onboarding.directive';
import { OnboardingConfig } from './onboarding-config.interface';

import { OnboardingConfigToken } from './onboarding-config.token';

@Injectable()
export class InternalOnboardingService {

  constructor(@Inject(OnboardingConfigToken) private config: OnboardingConfig) {
  }

  private overlays: Map<number, OnboardingDirective> = new Map();
  private latestOverlayId: number;
  private currentText: string;

  public showOverlay(id: number) {
    const overlay = this.overlays.get(id);
    if (overlay) {
      this.latestOverlayId = id;
      overlay.showOverlay();
    }
  }

  public registerOverlay(overlay: OnboardingDirective) {
    this.overlays.set(overlay.onboquiId, overlay);
  }

  public destroyOverlay(overlayId: number) {
    this.overlays.delete(overlayId);
  }

  public hideOverlay(callingOverlay?: OnboardingDirective) {
    const overlay = callingOverlay || this.overlays.get(this.latestOverlayId);
    if (overlay) {
      overlay.hideOverlay();
      if (this.config.showNextOnClose !== false && this.latestOverlayId === overlay.onboquiId) {
        this.showNext();
      }
    }
  }

  private showNext() {
    if (this.overlays.has(this.latestOverlayId + 1)) {
      setTimeout(() => {
        if (this.overlays.has(this.latestOverlayId + 1)) {
          this.latestOverlayId++;
          this.showOverlay(this.latestOverlayId);
        }
      }, 500);
    }
  }

  public getComponent() {
    if (!this.config || !this.config.component) {
      throw new Error('The onboarding view component is missing. ' +
        'Check the configuration object for your OnboardingModule.forRoot() import.');
    }
    return this.config.component;
  }

  public setText(text: string) {
    this.currentText = text;
  }

  public getText(): string {
    return this.currentText;
  }
}
