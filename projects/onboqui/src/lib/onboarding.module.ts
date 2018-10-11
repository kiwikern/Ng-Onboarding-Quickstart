import { ModuleWithProviders, NgModule } from '@angular/core';
import { OnboardingComponent } from './onboarding.component';
import { OnboardingDirective } from './onboarding.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { InternalOnboardingService } from './internal-onboarding.service';
import { OnboardingConfig } from './onboarding-config.interface';
import { CloseDirective } from './marker-directives/close.directive';
import { TextContainerDirective } from './marker-directives/text-container.directive';

@NgModule({
  imports: [
    OverlayModule
  ],
  declarations: [OnboardingComponent, OnboardingDirective, CloseDirective, TextContainerDirective],
  exports: [OnboardingDirective, CloseDirective, TextContainerDirective],
  entryComponents: [OnboardingComponent]
})
export class OnboardingModule {

  public static forRoot(config: OnboardingConfig): ModuleWithProviders {
    return {
      ngModule: OnboardingModule,
      providers: [
        InternalOnboardingService,
        {provide: 'config', useValue: config}
      ]
    };
  }

}
