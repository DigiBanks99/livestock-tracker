import { KeyEntity } from './key-entity.interface';

export class Unit implements KeyEntity<number> {
  public id: number;
  public description: string;
}
