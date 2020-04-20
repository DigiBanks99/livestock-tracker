import { KeyEntity } from './key-entity.interface';

export class FeedingTransaction implements KeyEntity<number> {
  animalId: number;
  feedTypeId: number;
  id: number;
  quantity: number;
  transactionDate: Date;
  unitId: number;
}
