import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { FeedingTransactionService } from './feeding-transaction.service';

describe('FeedingTransactionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FeedingTransactionService]
    });
  });

  it('should be created', inject(
    [FeedingTransactionService],
    (service: FeedingTransactionService) => {
      expect(service).toBeTruthy();
    }
  ));
});
