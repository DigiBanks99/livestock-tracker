import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnimalState, FetchAnimalTransactionEffects } from '@core/store';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { WeightTransaction } from '@weight/interfaces';
import { WeightService } from '@weight/services';
import { WeightProviderModule } from '@weight/weight-provider.module';

import { actions } from './weight.actions';
import { Constants } from './weight.constants';

@Injectable({
  providedIn: WeightProviderModule
})
export class WeightEffects extends FetchAnimalTransactionEffects<
  WeightTransaction
> {
  constructor(
    actions$: Actions,
    animalStore: Store<AnimalState>,
    weightService: WeightService,
    snackBar: MatSnackBar
  ) {
    super(
      actions$,
      animalStore,
      weightService,
      actions,
      Constants.StoreKey,
      snackBar
    );
  }
}
