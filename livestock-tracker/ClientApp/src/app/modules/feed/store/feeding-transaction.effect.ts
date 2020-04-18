import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import {
  ActionTypes as AnimalActionTypes,
  SelectAnimal
} from '@animal/store/animal.actions';
import { FeedingTransaction } from '@core/models/feeding-transaction.model';
import { CrudEffects } from '@core/store/crud.effects';
import { FeedingTransactionService } from '@feed/services';
import { actions as feedingTransactionActions } from '@feed/store/feeding-transaction.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { FeedingTransactionKey } from './constants';

@Injectable()
export class FeedingTransactionEffects extends CrudEffects<
  FeedingTransaction,
  number,
  FeedingTransaction[]
> {
  constructor(
    protected actions$: Actions,
    feedingTransactionService: FeedingTransactionService
  ) {
    super(
      actions$,
      feedingTransactionService,
      feedingTransactionActions,
      FeedingTransactionKey
    );
  }

  @Effect()
  selectedAnimalChanged$: Observable<Action> = this.actions$.pipe(
    ofType(AnimalActionTypes.SELECT_ANIMAL),
    map((action: SelectAnimal) => action.key),
    map((_) => feedingTransactionActions.fetchItems())
  );
}
