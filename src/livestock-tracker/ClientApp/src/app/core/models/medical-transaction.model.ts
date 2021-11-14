import { KeyEntity } from './key-entity.interface';

export interface MedicalTransaction extends KeyEntity<number> {
  id: number;
  animalId: number;
  medicineId: number;
  transactionDate: Date;
  dose: number;
  unitId: number;
}
