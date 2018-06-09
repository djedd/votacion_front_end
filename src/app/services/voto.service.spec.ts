import { TestBed, inject } from '@angular/core/testing';

import { VotoService } from './voto.service';

describe('VotoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VotoService]
    });
  });

  it('should be created', inject([VotoService], (service: VotoService) => {
    expect(service).toBeTruthy();
  }));
});
