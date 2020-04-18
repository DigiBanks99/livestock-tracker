import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animalStore } from '@animal/store';
import { actions, SelectAnimal } from '@animal/store/animal.actions';
import { Animal } from '@core/models/livestock.model';
import { AppState } from '@core/store';
import { getAnimals, getSelectedAnimalId } from '@core/store/selectors';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss'],
})
export class AnimalComponent implements OnInit, OnDestroy {
  public animals$: Observable<Animal[]>;
  public selectedAnimal$: Observable<number>;
  public isFetching$: Observable<boolean>;
  public error$: Observable<Error>;
  public destroyed$ = new Subject();

  constructor(private store: Store<AppState>, private router: Router) {}

  public ngOnInit(): void {
    this.animals$ = this.store.pipe(
      select(getAnimals),
      takeUntil(this.destroyed$)
    );
    this.selectedAnimal$ = this.store.pipe(
      select(getSelectedAnimalId),
      takeUntil(this.destroyed$)
    );
    this.isFetching$ = this.store.pipe(
      select(animalStore.selectors.getFetchAnimalsPendingState),
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
