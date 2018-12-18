import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { LivestockService } from '@app/livestock/livestock.service';
import { ActionTypes, FetchAnimals, SetAnimals } from '@animal-store/actions';
import { startWith, switchMap, map } from 'rxjs/operators';
import { Livestock } from '@app/livestock/livestock.model';

@Injectable()
export class AnimalEffects {
  constructor(
    private actions$: Actions,
    private livestockService: LivestockService
  ) {}

  @Effect()
  getAll$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.FETCH_ANIMALS),
    startWith(new FetchAnimals()),
    switchMap(() => this.livestockService.index()),
    map((livestock: Livestock[]) => new SetAnimals(livestock))
  );
}
