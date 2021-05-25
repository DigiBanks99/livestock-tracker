import { RandomUtils } from '@core/utils';
import { WeightTransaction } from '@weight/interfaces';

const largeTransactionList: WeightTransaction[] = [];
const smallTransactionList: WeightTransaction[] = [];

for (let index = 0; index < 1000; index++) {
  const transaction: WeightTransaction = {
    id: index + 1,
    transactionDate: new Date(
      RandomUtils.getRndInteger(1500000000, 2000000000)
    ),
    animalId: RandomUtils.getRndInteger(1, 30),
    weight: RandomUtils.getRndInteger(10, 1000)
  };
  largeTransactionList.push({ ...transaction });
  if (index < 10) {
    smallTransactionList.push({ ...transaction });
  }
}

export const LargeTransactionList: WeightTransaction[] = largeTransactionList;
export const SmallTransactionList: WeightTransaction[] = smallTransactionList;
