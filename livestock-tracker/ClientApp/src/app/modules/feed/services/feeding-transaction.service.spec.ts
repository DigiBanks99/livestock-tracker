import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { FeedingTransactionService } from './feeding-transaction.service';

describe('FeedingTransactionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FeedingTransactionService,
        { provide: 'BASE_URL', value: 'http://localhost:5000/api' }
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
