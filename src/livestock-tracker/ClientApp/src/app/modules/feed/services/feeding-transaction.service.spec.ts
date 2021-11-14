import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { BaseUrl } from '@core/di/base-url.injection-token';
import { getSelectedAnimalId } from '@core/store/selectors';
import { provideMockStore } from '@ngrx/store/testing';

import { FeedingTransactionService } from './feeding-transaction.service';

describe('FeedingTransactionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FeedingTransactionService,
        { provide: BaseUrl, value: 'http://localhost:5000/api' },
        provideMockStore({
          selectors: [{ selector: getSelectedAnimalId, value: -1 }]
        })
      ]
    });
  });

  it('should be created', inject(
    [FeedingTransactionService],
    (service: FeedingTransactionService) => {
      expect(service).toBeTruthy();
    }
  ));
});
