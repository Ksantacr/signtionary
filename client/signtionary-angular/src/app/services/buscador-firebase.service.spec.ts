import { TestBed, inject } from '@angular/core/testing';

import { BuscadorFirebaseService } from './buscador-firebase.service';

describe('BuscadorFirebaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuscadorFirebaseService]
    });
  });

  it('should be created', inject([BuscadorFirebaseService], (service: BuscadorFirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
