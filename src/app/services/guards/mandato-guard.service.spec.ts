import { TestBed, inject } from '@angular/core/testing';

import { MandatoGuardService } from './mandato-guard.service';

describe('MandatoGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MandatoGuardService]
    });
  });

  it('should be created', inject([MandatoGuardService], (service: MandatoGuardService) => {
    expect(service).toBeTruthy();
  }));
});
