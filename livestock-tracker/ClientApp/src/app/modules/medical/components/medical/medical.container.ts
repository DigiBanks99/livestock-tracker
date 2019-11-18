import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { Livestock } from '@app/core/models/livestock.model';
import { AppState } from '@core/store';
import { getSelectedAnimal } from '@core/store/selectors';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-medical-container',
  template: `
    <app-medical [currentAnimal]="selectedAnimal$ | async"></app-medical>
  `
})
export class MedicalContainerComponent implements OnInit {
  public selectedAnimal$: Observable<Livestock>;

  constructor(private store: Store<AppState>) {}

  public ngOnInit() {
    this.selectedAnimal$ = this.store.pipe(select(getSelectedAnimal));
  }
}
