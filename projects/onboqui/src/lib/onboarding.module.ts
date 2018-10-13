import { ModuleWithProviders, NgModule } from '@angular/core';
import { OnboardingDirective } from './onboarding.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { InternalOnboardingService } from './internal-onboarding.service';
import { OnboardingConfig } from './onboarding-config.interface';
import { CloseDirective } from './marker-directives/close.directive';
import { TextContainerDirective } from './marker-directives/text-container.directive';
import { OnboardingConfigToken } from './onboarding-config.token';
import { SkipDirective } from './marker-directives/skip.directive';

@NgModule({
  imports: [
    OverlayModule
  ],
  declarations: [OnboardingDirective, CloseDirective, SkipDirective, TextContainerDirective],
  exports: [OnboardingDirective, CloseDirective, SkipDirective, TextContainerDirective],
  providers: [
    InternalOnboardingService
  ],
})
export class OnboardingModule {

  public static forRoot(config: OnboardingConfig): ModuleWithProviders {
    return {
      ngModule: OnboardingModule,
      providers: [
        {provide: OnboardingConfigToken, useValue: config}
      ]
    };
  }

}
