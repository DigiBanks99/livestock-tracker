import { Observable } from 'rxjs';

import { Component } from '@angular/core';
import { Unit } from '@core/models/unit.model';
import { AppState } from '@core/store';
import { getUnits } from '@core/store/selectors';
import { select, Store } from '@ngrx/store';
import { unitStore } from '@unit/store';
import { AddUnit, RemoveUnit, UpdateUnit } from '@unit/store/unit.actions';

@Component({
  selector: 'app-unit-container',
  template: `
    <app-unit
      [units]="units$ | async"
      [isPending]="isPending$ | async"
      [error]="error$ | async"
      (remove)="onRemove($event)"
      (add)="onAdd($event)"
      (save)="onSave($event)"
    ></app-unit>
  `
})
export class UnitContainerComponent {
  public units$: Observable<Unit[]>;
  public isPending$: Observable<boolean>;
  public error$: Observable<Error>;

  constructor(private store: Store<AppState>) {
    this.units$ = this.store.pipe(select(getUnits));
    this.isPending$ = this.store.pipe(
      select(unitStore.unitSelectors.getUnitPending)
    );
    this.error$ = this.store.pipe(select(unitStore.unitSelectors.getUnitError));
  }

  public onAdd(unit: Unit) {
    this.store.dispatch(new AddUnit(unit));
  }

  public onSave(unit: Unit) {
    this.store.dispatch(new UpdateUnit(unit));
  }

  public onRemove(id: number) {
    this.store.dispatch(new RemoveUnit(id));
  }
}
