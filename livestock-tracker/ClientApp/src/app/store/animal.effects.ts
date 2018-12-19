import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  ActionTypes,
  FetchAnimals,
  SetAnimals,
  RemoveAnimal,
  RemoveAnimalSucceeded
} from '@animal-store/actions';
import { startWith, switchMap, map } from 'rxjs/operators';
import { LivestockService } from '@livestock/livestock.service';
import { Livestock } from '@livestock/livestock.model';

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

  @Effect()
  remove$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.REMOVE_ANIMAL),
    map((action: RemoveAnimal) => action.key),
    switchMap((id: number) =>
      this.livestockService
        .removeLivestock(id)
        .pipe(map(() => new RemoveAnimalSucceeded(id)))
    )
  );
}