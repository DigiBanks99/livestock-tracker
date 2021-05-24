import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Component, Input, OnDestroy } from '@angular/core';
import { SelectAnimalAction } from '@animal/store/animal.actions';
import { Animal } from '@core/models';
import { AppState } from '@core/store';
import { getAnimals, getSelectedAnimal } from '@core/store/selectors';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-animal-select-container',
  template: `
    <app-animal-select
      fxFill
      [animal]="animal$ | async"
      [animals]="animals$ | async"
      (animalChanged)="onAnimalChanged($event)"
      [disabled]="disabled"
    ></app-animal-select>
  `
})
export class AnimalSelectContainer implements OnDestroy {
  @Input() public disabled = false;

  public animal$: Observable<Animal>;
  public animals$: Observable<Animal[]>;

  private destroyed$ = new Subject<void>();

  constructor(private store: Store<AppState>) {
    this.animals$ = this.store.pipe(
      select(getAnimals),
      takeUntil(this.destroyed$)
    );
    this.animal$ = this.store.pipe(
      select(getSelectedAnimal),
      takeUntil(this.destroyed$)
    );
  }

  public ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public onAnimalChanged(id: number) {
    this.store.dispatch(new SelectAnimalAction(id));
  }
}
