import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animalStore } from '@animal-store';
import { Animal } from '@core/models/livestock.model';
import { AppState } from '@core/store';
import { getAnimals, getSelectedAnimalId } from '@core/store/selectors';
import { actions, SelectAnimal } from '@livestock/store/animal.actions';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-livestock',
  templateUrl: './livestock.component.html',
  styleUrls: ['./livestock.component.scss']
})
export class LivestockComponent implements OnInit, OnDestroy {
  public toggle = false;
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
    this.router.navigate(['livestock', id, 'edit']);
  }

  public addAnimal(): void {
    this.router.navigate(['/livestock', 'new']);
  }

  public ngOnDestroy(): void {
    this.destroyed$.complete();
  }
}
