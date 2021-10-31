import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Component, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AnimalOrderType } from '@animal/enums';
import { AnimalStore } from '@animal/store';
import { actions, FetchAnimalsAction } from '@animal/store/animal.actions';
import { OrderOptions } from '@core/models';
import { Animal } from '@core/models/livestock.model';
import { AppState } from '@core/store';
import { getAnimals, getSelectedAnimalId } from '@core/store/selectors';
import { environment } from '@env/environment';
import { select, Store } from '@ngrx/store';

@Component({
  template: ` <div class="title">
      <h1 class="mat-h1">Animals</h1>
      <span
        >Include Archived
        <mat-slide-toggle
          (toggleChange)="onIncludeArchived()"
        ></mat-slide-toggle
      ></span>
    </div>
    <app-animal-list
      [animals]="animals$ | async"
      [isFetching]="isFetching$ | async"
      (addAnimal)="addAnimal()"
      (archive)="onArchive($event)"
      (orderChange)="onOrderChanged($event)"
      (pageChange)="onPageChanged($event)"
      (remove)="deleteAnimal($event)"
      (showDetail)="showDetail($event)"
    ></app-animal-list>`
})
export class AnimalListPage implements OnDestroy {
  public readonly animals$: Observable<Animal[]>;
  public readonly selectedAnimal$: Observable<number>;
  public readonly isFetching$: Observable<boolean>;
  public readonly error$: Observable<Error>;

  private readonly _destroyed$ = new Subject<void>();
  private readonly _pageEvent$ = new BehaviorSubject<PageEvent>({
    pageIndex: 0,
    pageSize: environment.pageSize,
    length: 0
  });
  private readonly _orderOptions$ = new BehaviorSubject<
    OrderOptions<AnimalOrderType>
  >({
    direction: 'Ascending',
    property: null
  });
  private readonly _includeArchived$ = new BehaviorSubject<boolean>(false);

  constructor(private _store: Store<AppState>, private _router: Router) {
    this.animals$ = this._store.pipe(
      select(getAnimals),
      takeUntil(this._destroyed$)
    );
    this.selectedAnimal$ = this._store.pipe(
      select(getSelectedAnimalId),
      takeUntil(this._destroyed$)
    );
    this.isFetching$ = this._store.pipe(
      select(AnimalStore.selectors.animalsPendingState),
      takeUntil(this._destroyed$)
    );
    this.error$ = this._store.pipe(
      select(AnimalStore.selectors.getAnimalsError),
      takeUntil(this._destroyed$)
    );

    this.setupAnimalFetchObservable();
  }

  public deleteAnimal(animal: Animal): void {
    const response = confirm('Are you sure?');
    if (response) {
      this._store.dispatch(actions.deleteItem(animal.id));
    }
  }

  public showDetail(id: number): void {
    this._router.navigate(['animal', id, 'edit']);
  }

  public addAnimal(): void {
    this._router.navigate(['/animal', 'new']);
  }

  public onArchive(animalIds: number[]): void {
    this._store.dispatch(new AnimalStore.actions.ArchiveAnimals(animalIds));
  }

  public onIncludeArchived(): void {
    this._includeArchived$.next(!this._includeArchived$.value);
  }

  public onOrderChanged(orderEvent: OrderOptions<AnimalOrderType>) {
    this._orderOptions$.next(orderEvent);
  }

  public onPageChanged(pageEvent: PageEvent): void {
    this._pageEvent$.next(pageEvent);
  }

  public ngOnDestroy(): void {
    this._destroyed$.complete();
  }

  private setupAnimalFetchObservable(): void {
    combineLatest([
      this._pageEvent$,
      this._orderOptions$,
      this._includeArchived$
    ])
      .pipe(takeUntil(this._destroyed$))
      .subscribe(
        ([pageEvent, orderOptions, includeArchived]: [
          PageEvent,
          OrderOptions<AnimalOrderType>,
          boolean
        ]) =>
          this._store.dispatch(
            new FetchAnimalsAction(
              pageEvent.pageIndex,
              pageEvent.pageSize,
              orderOptions,
              includeArchived
            )
          )
      );
  }
}
