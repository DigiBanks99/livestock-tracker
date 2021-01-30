import { EMPTY, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { animalActions, animalStore } from '@animal/store/index';
import { Animal } from '@app/core/models';
import { AppState } from '@core/store';
import { getSelectedAnimal } from '@core/store/selectors';
import { select, Store } from '@ngrx/store';

@Component({
  template: `<app-animal-form
    [currentAnimal]="animal$ | async"
    [isPending]="isPending$ | async"
    [error]="error$ | async"
    header="Edit animal"
    successMessage="Animal saved."
    (navigateBack)="onNavigateBack()"
    (save)="onSave($event)"
  ></app-animal-form>`
})
export class AnimalDetailPage implements OnDestroy {
  public animal$: Observable<Animal> = EMPTY;
  public isPending$: Observable<boolean> = EMPTY;
  public error$: Observable<Error> = EMPTY;

  private destroyed$ = new Subject();

  constructor(private store: Store<AppState>, private location: Location) {
    this.isPending$ = this.store.pipe(
      select(animalStore.selectors.animalsPendingState),
      takeUntil(this.destroyed$)
    );
    this.error$ = this.store.pipe(
      select(animalStore.selectors.getAnimalsError),
      takeUntil(this.destroyed$)
    );
    this.animal$ = this.store.pipe(
      select(getSelectedAnimal),
      takeUntil(this.destroyed$)
    );
  }

  public onSave(animal: Animal): void {
    this.store.dispatch(animalActions.actions.updateItem(animal, animal.id));
  }

  public onNavigateBack(): void {
    this.location.back();
  }

  public ngOnDestroy(): void {
    this.destroyed$.complete();
  }
}
