import { TestBed, inject } from '@angular/core/testing';

import { FeedingTransactionService } from './feeding-transaction.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FeedingTransactionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FeedingTransactionService]
    });
  });

  it('should be created', inject([FeedingTransactionService], (service: FeedingTransactionService) => {
    expect(service).toBeTruthy();
  }));
});
