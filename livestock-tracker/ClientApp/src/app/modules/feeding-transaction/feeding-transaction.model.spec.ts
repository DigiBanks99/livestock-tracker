import { FeedingTransaction } from './feeding-transaction.model';

describe('FeedingTransactionModule', () => {
  let feedingTransaction: FeedingTransaction;

  beforeEach(() => {
    feedingTransaction = new FeedingTransaction();
  });

  it('should create an instance', () => {
    expect(feedingTransaction).toBeTruthy();
  });
});
