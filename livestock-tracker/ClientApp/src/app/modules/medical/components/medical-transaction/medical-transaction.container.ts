import { Observable } from 'rxjs';

import { Component, Input } from '@angular/core';
import { MedicalTransaction } from '@core/models/medical-transaction.model';
import { Unit } from '@core/models/unit.model';
import { AppState } from '@core/store';
import { getUnits } from '@core/store/selectors';
import { select, Store } from '@ngrx/store';

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

  constructor(private store: Store<AppState>) {
    this.units$ = this.store.pipe(select(getUnits));
  }
}
