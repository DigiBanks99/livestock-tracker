import { KeyEntity } from './key-entity.interface';

export interface MedicineType extends KeyEntity<number> {
  id: number;
  description: string;
}
