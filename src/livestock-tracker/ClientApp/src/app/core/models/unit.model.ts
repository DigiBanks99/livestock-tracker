import { KeyEntity } from './key-entity.interface';

export interface Unit extends KeyEntity<number> {
  id: number;
  description: string;
}
