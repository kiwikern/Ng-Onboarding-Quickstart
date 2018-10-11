import { InternalOnboardingService } from '../internal-onboarding.service';
import { TextContainerDirective } from './text-container.directive';
import { Renderer2 } from '@angular/core';
import createSpyObj = jasmine.createSpyObj;

describe('TextContainerDirective', () => {
  let service: InternalOnboardingService;
  let directive: TextContainerDirective;
  let renderer: Renderer2;

  beforeEach(() => {
    service = new InternalOnboardingService(null);
    renderer = <any>createSpyObj('Renderer2', ['createText', ['appendChild']]);
    directive = new TextContainerDirective({nativeElement: null}, renderer, service);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('create a text element when text is present', () => {
    spyOn(service, 'getText').and.returnValue('my text');
    directive.ngOnInit();
    expect(renderer.createText).toHaveBeenCalledWith('my text');
    expect(renderer.appendChild).toHaveBeenCalled();
  });

  it('should not do anything when no text is present', () => {
    spyOn(service, 'getText').and.returnValue(null);
    directive.ngOnInit();
    expect(renderer.createText).not.toHaveBeenCalled();
    expect(renderer.appendChild).not.toHaveBeenCalled();
  });
});

