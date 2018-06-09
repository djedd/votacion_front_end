import { TestBed, inject } from '@angular/core/testing';

import { MandatoService } from './mandato.service';

describe('MandatoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MandatoService]
    });
  });

  it('should be created', inject([MandatoService], (service: MandatoService) => {
    expect(service).toBeTruthy();
  }));
});
