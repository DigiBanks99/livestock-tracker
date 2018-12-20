import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  ActionTypes,
  FetchAnimals,
  SetAnimals,
  RemoveAnimal,
  RemoveAnimalSucceeded,
  AddAnimal,
  AddAnimalSucceeded,
  UpdateAnimal,
  UpdateAnimalSucceeded,
  HandleError,
  HandleFetchAnimalsError
} from '@animal-store/actions';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { LivestockService } from '@livestock/livestock.service';
import { Livestock, Animal } from '@livestock/livestock.model';
import { HttpErrorResponse } from '@angular/common/http';

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
    map((livestock: Livestock[]) => new SetAnimals(livestock)),
    catchError((err: any) => {
      let error: Error;
      if (typeof err === typeof Error) error = err;
      else if (typeof err === typeof HttpErrorResponse) {
        const httpError = <HttpErrorResponse>err;
        error = new Error(httpError.message);
        error.name = httpError.name;
        error.stack = httpError.url;
      } else error = new Error(err);

      return of(new HandleFetchAnimalsError(error));
    })
  );

  @Effect()
  remove$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.REMOVE_ANIMAL),
    map((action: RemoveAnimal) => action.key),
    switchMap((id: number) =>
      this.livestockService
        .removeLivestock(id)
        .pipe(map(() => new RemoveAnimalSucceeded(id)))
    ),
    catchError(handleError)
  );

  @Effect()
  add$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.ADD_ANIMAL),
    map((action: AddAnimal) => action.animal),
    switchMap((animal: Livestock) => this.livestockService.addAnimal(animal)),
    map((animal: Livestock) => new AddAnimalSucceeded(animal)),
    catchError(handleError)
  );

  @Effect()
  update$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.UPDATE_ANIMAL),
    map((action: UpdateAnimal) => action.animal),
    switchMap((animal: Livestock) =>
      this.livestockService.updateAnimal(animal)
    ),
    switchMap((animal: Animal) => {
      const testCast = <Livestock>animal;
      const updateObj = {
        changes: animal,
        id: animal.id
      };
      return of(new UpdateAnimalSucceeded(updateObj));
    }),
    catchError(handleError)
  );
}

function handleError(err: any): Observable<HandleError> {
  let error: Error;
  if (err instanceof Error) error = err;
  else if (err instanceof HttpErrorResponse) {
    const httpError = <HttpErrorResponse>err;
    error = new Error(httpError.error);
    error.name = httpError.name;
    error.stack = httpError.url;
  } else error = new Error(err);

  return of(new HandleError(error));
}
