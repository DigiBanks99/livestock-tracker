import { KeyEntity } from './key-entity.interface';

export class FeedType implements KeyEntity<number> {
  public id: number;
  public description: string;
}
