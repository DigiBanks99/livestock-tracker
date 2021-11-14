import { KeyEntity } from './key-entity.interface';

export interface FeedType extends KeyEntity<number> {
  id: number;
  description: string;
}
