import { KeyEntity } from './key-entity.interface';

export interface FeedingTransaction extends KeyEntity<number> {
  animalId: number;
  feedTypeId: number;
  id: number;
  quantity: number;
  transactionDate: Date;
  unitId: number;
}
