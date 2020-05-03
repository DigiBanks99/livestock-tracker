import { KeyEntity } from './key-entity.interface';

export class MedicineType implements KeyEntity<number> {
  public id: number;
  public description: string;
}
