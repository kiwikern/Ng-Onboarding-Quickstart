export interface ComponentType extends Function {
  new(...args: any[]);
}

export interface OnboardingConfig {
  component: ComponentType;
  showNextOnClose?: boolean;
  showNextDelayMs?: number;
}
