import { TestBed, inject } from '@angular/core/testing';

import { UnitService } from './unit.service';

describe('UnitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnitService]
    });
  });

  it('should be created', inject([UnitService], (service: UnitService) => {
    expect(service).toBeTruthy();
  }));
});
