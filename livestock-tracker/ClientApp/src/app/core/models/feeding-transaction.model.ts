import { KeyEntity } from './key-entity.interface';

export class FeedingTransaction implements KeyEntity<number> {
  animalID: number;
  feedID: number;
  id: number;
  quantity: number;
  transactionDate: Date;
  unitTypeCode: number;
}
