import { ComponentType } from '@angular/cdk/portal';

export interface OnboardingConfig {
  component: ComponentType<any>;
  showNextOnClose?: boolean;
}
