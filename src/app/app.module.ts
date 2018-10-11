import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OnboardingModule } from '../../projects/onboqui/src/lib/onboarding.module';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OnboardingViewComponent } from './onboarding-view/onboarding-view.component';

@NgModule({
  declarations: [
    AppComponent,
    OnboardingViewComponent
  ],
  imports: [
    BrowserModule,
    OnboardingModule.forRoot({component: OnboardingViewComponent}),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [OnboardingViewComponent]
})
export class AppModule { }
