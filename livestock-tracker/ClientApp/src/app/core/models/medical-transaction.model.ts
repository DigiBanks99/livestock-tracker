import { KeyEntity } from './key-entity.interface';

export class MedicalTransaction implements KeyEntity<number> {
  public id: number;
  public animalId: number;
  public medicineId: number;
  public transactionDate: Date;
  public dose: number;
  public unitId: number;
}
