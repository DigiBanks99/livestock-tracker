import { TestBed, inject } from '@angular/core/testing';

import { UnitService } from './unit.service';
import { HttpClientTestingModule } from '../../../node_modules/@angular/common/http/testing';

describe('UnitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnitService],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([UnitService], (service: UnitService) => {
    expect(service).toBeTruthy();
  }));
});
