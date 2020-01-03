import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { UnitService } from './unit.service';

describe('UnitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnitService,
        { provide: 'BASE_URL', value: 'http://localhost:5000/api' }
      ],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([UnitService], (service: UnitService) => {
    expect(service).toBeTruthy();
  }));
});
