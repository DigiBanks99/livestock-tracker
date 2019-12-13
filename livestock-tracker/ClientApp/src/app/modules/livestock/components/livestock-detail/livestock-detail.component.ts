import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { animalStore } from '@animal-store';
import { Animal } from '@app/core/models/livestock.model';
import { AppState } from '@core/store';
import { getSelectedAnimal } from '@core/store/selectors';
import { actions } from '@livestock/store/animal.actions';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-livestock-detail',
  templateUrl: './livestock-detail.component.html',
  styleUrls: ['./livestock-detail.component.scss']
})
export class LivestockDetailComponent implements OnInit, OnDestroy {
  public animal$: Observable<Animal>;
  public isPending$: Observable<boolean>;
  public error$: Observable<Error>;
  public destroyed$ = new Subject();

  constructor(private store: Store<AppState>, private location: Location) {}

  public ngOnInit(): void {
    this.isPending$ = this.store.pipe(
      select(animalStore.selectors.getAnimalsPendingState),
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
    this.store.dispatch(actions.updateItem(animal, animal.id));
  }

  public onNavigateBack(): void {
    this.location.back();
  }

  public ngOnDestroy(): void {
    this.destroyed$.complete();
  }
}
