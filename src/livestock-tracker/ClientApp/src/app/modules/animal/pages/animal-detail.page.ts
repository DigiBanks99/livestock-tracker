import {
  EMPTY,
  Observable,
  Subject
} from 'rxjs';
import {
  filter,
  takeUntil
} from 'rxjs/operators';

import {
  Component,
  OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import {
  RecordAnimalDeath,
  SellAnimal
} from '@animal/events';
import {
  ArchiveAnimals,
  RecordAnimalDeathAction,
  SellAnimalAction,
  UnarchiveAnimals
} from '@animal/store/animal.actions';
import { AnimalStore } from '@animal/store/index';
import {
  Animal,
  SaveState
} from '@core/models';
import { AppState } from '@core/store';
import { getSelectedAnimal } from '@core/store/selectors';
import {
  select,
  Store
} from '@ngrx/store';

@Component({
  template: `<app-animal-form
    [currentAnimal]="animal$ | async"
    [isPending]="isPending$ | async"
    [error]="error$ | async"
    header="Edit animal"
    successMessage="Animal saved."
    (archive)="onArchive($event)"
    (navigateBack)="onNavigateBack()"
    (recordAnimalDeath)="onRecordAnimalDeath($event)"
    (save)="onSave($event)"
    (sellAnimal)="onSellAnimal($event)"
    (unarchive)="onUnarchive($event)"
  ></app-animal-form>`
})
export class AnimalDetailPage implements OnDestroy {
  public readonly animal$: Observable<Animal> = EMPTY;
  public readonly isPending$: Observable<boolean> = EMPTY;
  public readonly error$: Observable<Error> = EMPTY;

  private readonly _destroyed$ = new Subject();

  constructor(
    private readonly _store: Store<AppState>,
    private readonly _router: Router
  ) {
    _store.dispatch(AnimalStore.actions.resetSaveState());
    _store
      .select(AnimalStore.selectors.getSaveState)
      .pipe(takeUntil(this._destroyed$))
      .subscribe((saveState: SaveState): void => {
        if (saveState === SaveState.Success) {
          this.onNavigateBack();
        }
      });
    this.isPending$ = this._store.pipe(
      select(AnimalStore.selectors.animalsPendingState),
      takeUntil(this._destroyed$)
    );
    this.error$ = this._store.pipe(
      select(AnimalStore.selectors.getAnimalsError),
      takeUntil(this._destroyed$)
    );
    this.animal$ = this._store.pipe(
      select(getSelectedAnimal),
      filter((animal: Animal | null | undefined) => animal != null),
      takeUntil(this._destroyed$)
    );
  }

  public onArchive(id: number) {
    this._store.dispatch(new ArchiveAnimals([id]));
  }

  public onRecordAnimalDeath(deathRecord: RecordAnimalDeath): void {
    this._store.dispatch(RecordAnimalDeathAction(deathRecord));
  }

  public onSave(animal: Animal): void {
    this._store.dispatch(AnimalStore.actions.updateItem(animal, animal.id));
  }

  public onSellAnimal(sellAnimalEvent: SellAnimal): void {
    this._store.dispatch(SellAnimalAction(sellAnimalEvent));
  }

  public onNavigateBack(): void {
    this._router.navigate(['/animal']);
  }

  public onUnarchive(id: number) {
    this._store.dispatch(new UnarchiveAnimals([id]));
  }

  public ngOnDestroy(): void {
    this._destroyed$.complete();
  }
}
