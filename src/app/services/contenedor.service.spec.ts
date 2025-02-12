import { TestBed } from '@angular/core/testing';

import { ContenedorService } from './contenedor.service';

describe('ContenedorServiceService', () => {
  let service: ContenedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContenedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
