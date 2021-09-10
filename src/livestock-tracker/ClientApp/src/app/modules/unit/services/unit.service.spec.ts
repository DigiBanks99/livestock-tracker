import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BaseUrl } from '@core/di/base-url.injection-token';

import { UnitService } from './unit.service';

describe('UnitService', () => {
  let service: UnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnitService,
        { provide: BaseUrl, value: 'http://localhost:5000/api' }
      ],
      imports: [HttpClientTestingModule]
    });

    TestBed.inject(BaseUrl);
    service = TestBed.inject(UnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
