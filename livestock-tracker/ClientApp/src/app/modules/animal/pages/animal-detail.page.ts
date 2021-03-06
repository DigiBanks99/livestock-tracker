import { EMPTY, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { AnimalStore } from '@animal/store/index';
import { Animal, SaveState } from '@app/core/models';
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
  public readonly animal$: Observable<Animal> = EMPTY;
  public readonly isPending$: Observable<boolean> = EMPTY;
  public readonly error$: Observable<Error> = EMPTY;

  private readonly destroyed$ = new Subject();

  constructor(private store: Store<AppState>, private location: Location) {
    store.dispatch(AnimalStore.actions.resetSaveState());
    store
      .select(AnimalStore.selectors.getSaveState)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((saveState: SaveState): void => {
        if (saveState === SaveState.Success) {
          this.location.back();
        }
      });
    this.isPending$ = this.store.pipe(
      select(AnimalStore.selectors.animalsPendingState),
      takeUntil(this.destroyed$)
    );
    this.error$ = this.store.pipe(
      select(AnimalStore.selectors.getAnimalsError),
      takeUntil(this.destroyed$)
    );
    this.animal$ = this.store.pipe(
      select(getSelectedAnimal),
      filter((animal: Animal | null | undefined) => animal != null),
      takeUntil(this.destroyed$)
    );
  }

  public onSave(animal: Animal): void {
    this.store.dispatch(AnimalStore.actions.updateItem(animal, animal.id));
  }

  public onNavigateBack(): void {
    this.location.back();
  }

  public ngOnDestroy(): void {
    this.destroyed$.complete();
  }
}
