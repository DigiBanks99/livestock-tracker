import { Store, select } from '@ngrx/store';
import { State, selectors } from '@store';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Unit } from './unit.model';
import { AddUnit, UpdateUnit, RemoveUnit } from '@unit-store/actions';

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

  constructor(private store: Store<State>) {
    this.units$ = this.store.pipe(select(selectors.unitSelectors.getUnits));
    this.isPending$ = this.store.pipe(
      select(selectors.unitSelectors.getUnitPending)
    );
    this.error$ = this.store.pipe(select(selectors.unitSelectors.getUnitError));
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
