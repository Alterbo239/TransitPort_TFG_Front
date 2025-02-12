import { TestBed } from '@angular/core/testing';

import { SuppliersService } from './data.service';

describe('DataService', () => {
  let service: SuppliersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuppliersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
