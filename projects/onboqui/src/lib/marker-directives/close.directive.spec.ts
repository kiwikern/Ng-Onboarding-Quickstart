import { CloseDirective } from './close.directive';
import { InternalOnboardingService } from '../internal-onboarding.service';

describe('CloseDirective', () => {
  let service: InternalOnboardingService;
  let directive: CloseDirective;

  beforeEach(() => {
    service = new InternalOnboardingService(null);
    directive = new CloseDirective(service);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should hide on click', () => {
    spyOn(service, 'hideOverlay');
    directive.onClick();
    expect(service.hideOverlay).toHaveBeenCalled();
  });
});
