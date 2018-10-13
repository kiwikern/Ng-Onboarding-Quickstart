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
  private isActive = false;
  private currentText: string;
  private timeoutId: number;

  public showOverlay(id: number) {
    clearTimeout(this.timeoutId);
    if (this.isActive) {
      this.hideOverlay(true);
    }

    const overlay = this.overlays.get(id);
    if (overlay) {
      this.latestOverlayId = id;
      this.isActive = true;
      overlay.showOverlay();
    } else {
      console.warn(`Could not find onboarding view with id ${id}.`);
    }
  }

  public registerOverlay(overlay: OnboardingDirective) {
    if (!this.overlays.has(overlay.id)) {
      this.overlays.set(overlay.id, overlay);
    }
  }

  public destroyOverlay(overlayId: number) {
    this.overlays.delete(overlayId);
  }

  public hideOverlay(preventShowingNext?: boolean) {
    const overlay = this.overlays.get(this.latestOverlayId);
    this.isActive = false;
    if (overlay) {
      overlay.hideOverlay();
      if (this.config.showNextOnClose !== false && !preventShowingNext) {
        this.showNext();
      }
    }
  }

  public markOverlayAsHidden(overlayId: number) {
    if (overlayId === this.latestOverlayId) {
      this.isActive = false;
      if (this.config.showNextOnClose !== false) {
        this.showNext();
      }
    }
  }

  private showNext() {
    const delay = Number.isInteger(this.config.showNextDelayMs) ? this.config.showNextDelayMs : 300;
    if (this.overlays.has(this.latestOverlayId + 1)) {
      this.timeoutId = window.setTimeout(() => {
        if (this.overlays.has(this.latestOverlayId + 1)) {
          this.showOverlay(this.latestOverlayId + 1);
        }
      }, delay);
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
