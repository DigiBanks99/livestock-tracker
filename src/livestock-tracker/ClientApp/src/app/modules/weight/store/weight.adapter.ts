import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { WeightTransaction } from '@weight/interfaces';

export const weightTransactionAdapter: EntityAdapter<WeightTransaction> = createEntityAdapter<
  WeightTransaction
>({
  selectId: (transaction: WeightTransaction) => transaction.id,
  sortComparer: (transaction: WeightTransaction) =>
    transaction.transactionDate.valueOf()
});
