import { AnimalOrderType } from '@animal/enums';
import {
  RecordAnimalDeath,
  SellAnimal
} from '@animal/events';
import { KraalStats } from '@animal/models';
import {
  Animal,
  OrderOptions
} from '@core/models';
import {
  CrudActions,
  crudActionsFactory,
  PayloadAction
} from '@core/store';
import {
  Action,
  createAction,
  props
} from '@ngrx/store';

import { AnimalActionTypes } from './animal.action-types';
import { AnimalKey } from './constants';

export class SelectAnimalAction implements PayloadAction<number> {
  readonly type = AnimalActionTypes.SelectAnimal;
  public readonly key: number;
  public readonly payload: number;

  constructor(id: number) {
    this.key = id;
    this.payload = id;
  }
}

export class FetchAnimalsAction implements Action {
  public readonly type = AnimalActionTypes.FetchAnimals;

  constructor(
    public pageNumber: number = 0,
    public pageSize: number = 10,
    public orderOptions?: OrderOptions<AnimalOrderType>,
    public includeArchived?: boolean
  ) {}
}

export class ArchiveAnimals implements Action {
  public readonly type = AnimalActionTypes.ArchiveAnimals;

  constructor(public animalIds: number[]) {}
}

export class UnarchiveAnimals implements Action {
  public readonly type = AnimalActionTypes.UnarchiveAnimals;

  constructor(public animalIds: number[]) {}
}
export const SellAnimalAction = createAction(
  'Sell Animal',
  props<SellAnimal>()
);
export const RecordAnimalDeathAction = createAction(
  'Record Animal Death',
  props<RecordAnimalDeath>()
);

export const FetchKraalStats = createAction(`[${AnimalKey}] Fetch Kraal Stats`);
export const FetchKraalStatsSuccess = createAction(
  `[${AnimalKey}] Fetch Kraal Stats - Success`,
  props<KraalStats>()
);

const crudActions: CrudActions<Animal, number, number> =
  crudActionsFactory<Animal, number, number>(AnimalKey);

export const actions = {
  ...crudActions,
  FetchKraalStats,
  FetchKraalStatsSuccess
};
