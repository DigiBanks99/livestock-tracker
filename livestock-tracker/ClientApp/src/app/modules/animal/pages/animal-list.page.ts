import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { animalStore } from '@animal/store';
import {
  actions,
  FetchAnimals,
  SelectAnimal
} from '@animal/store/animal.actions';
import { Animal } from '@core/models/livestock.model';
import { AppState } from '@core/store';
import { getAnimals, getSelectedAnimalId } from '@core/store/selectors';
import { select, Store } from '@ngrx/store';

@Component({
  template: `<app-animal-list
    [animals]="animals$ | async"
    [isFetching]="isFetching$ | async"
    (remove)="deleteAnimal($event)"
    (showDetail)="showDetail($event)"
    (addAnimal)="addAnimal()"
  ></app-animal-list>`
})
export class AnimalListPage implements OnDestroy {
  public animals$: Observable<Animal[]>;
  public selectedAnimal$: Observable<number>;
  public isFetching$: Observable<boolean>;
  public error$: Observable<Error>;
  public destroyed$ = new Subject();

  constructor(private store: Store<AppState>, private router: Router) {
    this.store.dispatch(new FetchAnimals());
    this.animals$ = this.store.pipe(
      select(getAnimals),
      takeUntil(this.destroyed$)
    );
    this.selectedAnimal$ = this.store.pipe(
      select(getSelectedAnimalId),
      takeUntil(this.destroyed$)
    );
    this.isFetching$ = this.store.pipe(
      select(animalStore.selectors.animalsPendingState),
      takeUntil(this.destroyed$)
    );
    this.error$ = this.store.pipe(
      select(animalStore.selectors.getAnimalsError),
      takeUntil(this.destroyed$)
    );
  }

  public deleteAnimal(animal: Animal): void {
    const response = confirm('Are you sure?');
    if (response) {
      this.store.dispatch(actions.deleteItem(animal.id));
    }
  }

  public showDetail(id: number): void {
    this.store.dispatch(new SelectAnimal(id));
    this.router.navigate(['animal', id, 'edit']);
  }

  public addAnimal(): void {
    this.router.navigate(['/animal', 'new']);
  }

  public ngOnDestroy(): void {
    this.destroyed$.complete();
  }
}
