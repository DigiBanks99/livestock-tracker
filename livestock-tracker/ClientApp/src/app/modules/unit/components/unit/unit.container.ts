import { EMPTY, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Component, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Unit } from '@core/models/unit.model';
import { AppState } from '@core/store';
import { getUnits } from '@core/store/selectors';
import { select, Store } from '@ngrx/store';
import { unitStore } from '@unit/store';
import { actions, FetchUnits } from '@unit/store/unit.actions';

@Component({
  selector: 'app-unit-container',
  template: `
    <app-unit
      [units]="units$ | async"
      [isPending]="isPending$ | async"
      [error]="error$ | async"
      [pageNumber]="currentPage$ | async"
      [pageSize]="pageSize$ | async"
      [recordCount]="recordCount$ | async"
      (remove)="onRemove($event)"
      (add)="onAdd($event)"
      (save)="onSave($event)"
      (page)="onPage($event)"
    ></app-unit>
  `
})
export class UnitContainerComponent implements OnDestroy {
  public units$: Observable<Unit[]> = EMPTY;
  public isPending$: Observable<boolean> = EMPTY;
  public error$: Observable<Error> = EMPTY;
  public currentPage$: Observable<number> = EMPTY;
  public pageSize$: Observable<number> = EMPTY;
  public recordCount$: Observable<number> = EMPTY;

  private destroyed$ = new Subject<void>();

  constructor(private store: Store<AppState>) {
    this.store.dispatch(new FetchUnits());
    this.units$ = this.store.pipe(select(getUnits));
    this.isPending$ = this.store.pipe(
      select(unitStore.unitSelectors.getUnitPending)
    );
    this.error$ = this.store.pipe(select(unitStore.unitSelectors.getUnitError));

    this.pageSize$ = this.store.pipe(
      select(unitStore.unitSelectors.getPageSize),
      takeUntil(this.destroyed$)
    );
    this.currentPage$ = this.store.pipe(
      select(unitStore.unitSelectors.getCurrentPage),
      takeUntil(this.destroyed$)
    );
    this.recordCount$ = this.store.pipe(
      select(unitStore.unitSelectors.getRecordCount),
      takeUntil(this.destroyed$)
    );
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public onAdd(unit: Unit) {
    this.store.dispatch(actions.addItem(unit));
  }

  public onSave(unit: Unit) {
    this.store.dispatch(actions.updateItem(unit, unit.id));
  }

  public onRemove(id: number) {
    this.store.dispatch(actions.deleteItem(id));
  }

  public onPage(pageEvent: PageEvent) {
    this.store.dispatch(
      new FetchUnits(pageEvent.pageIndex, pageEvent.pageSize)
    );
  }
}
