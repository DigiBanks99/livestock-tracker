import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State, selectors } from '@store';
import { Unit } from '@unit/unit.model';
import { MedicalTransaction } from '@medical/medical-transaction.model';

@Component({
  selector: 'app-medical-transaction-container',
  template: `
    <app-medical-transaction
      [medicalTransaction]="medicalTransaction"
      [units]="units$ | async"
    ></app-medical-transaction>
  `
})
export class MedicalTransactionContainerComponent {
  @Input() medicalTransaction: MedicalTransaction;
  public units$: Observable<Unit[]>;

  constructor(private store: Store<State>) {
    this.units$ = this.store.pipe(select(selectors.unitSelectors.getUnits));
  }
}
