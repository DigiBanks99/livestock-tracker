import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalStore } from '@animal/store/index';
import { Animal, SaveState } from '@core/models';
import { AnimalState } from '@core/store';
import { select, Store } from '@ngrx/store';

@Component({
  template: `<app-animal-form
    [currentAnimal]="null"
    [isPending]="isPending$ | async"
    [error]="error$ | async"
    header="Add animal"
    successMessage="Animal created."
    (save)="onSave($event)"
    (navigateBack)="onNavigateBack()"
  ></app-animal-form>`
})
export class AnimalNewPage implements OnDestroy {
  public readonly isPending$: Observable<boolean>;
  public readonly error$: Observable<Error>;

  private readonly destroyed$ = new Subject();

  constructor(
    private readonly _store: Store<AnimalState>,
    private readonly _router: Router
  ) {
    _store.dispatch(AnimalStore.actions.resetSaveState());
    _store
      .select(AnimalStore.selectors.getSaveState)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((saveState: SaveState) => {
        if (saveState === SaveState.Success) {
          this.onNavigateBack();
        }
      });
    this.isPending$ = this._store.pipe(
      select(AnimalStore.selectors.animalsPendingState),
      takeUntil(this.destroyed$)
    );
    this.error$ = this._store.pipe(
      select(AnimalStore.selectors.getAnimalsError),
      takeUntil(this.destroyed$)
    );
  }

  public onSave(animal: Animal): void {
    this._store.dispatch(AnimalStore.actions.addItem({ ...animal, id: 0 }));
  }

  public onNavigateBack(): void {
    this._router.navigate(['/animal']);
  }

  public ngOnDestroy(): void {
    this.destroyed$.complete();
  }
}
