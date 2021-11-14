import { KeyEntity } from './key-entity.interface';

export interface AnimalTransaction extends KeyEntity<number> {
  id: number;
  animalId: number;
  transactionDate: Date;
}
