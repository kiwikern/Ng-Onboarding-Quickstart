import { Inject, Injectable } from '@angular/core';
import { OnboardingDirective } from './onboarding.directive';
import { OnboardingConfig } from './onboarding-config.interface';

@Injectable()
export class InternalOnboardingService {

  constructor(@Inject('config') private config: OnboardingConfig) {
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

  public hideOverlay(overlayId?: number) {
    const overlay = this.overlays.get(overlayId || this.latestOverlayId);
    if (overlay) {
      overlay.hideOverlay();
    }
    if (this.config.showNextOnClose !== false) {
      this.showNext();
    }
  }

  private showNext() {
    const overlay = this.overlays.get(this.latestOverlayId + 1);
    if (overlay) {
      this.latestOverlayId++;
      setTimeout(() => overlay.showOverlay(), 500);
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
