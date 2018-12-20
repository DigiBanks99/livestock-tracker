import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '@animal-store/reducers';
import { Observable } from 'rxjs';
import { Livestock } from '@livestock/livestock.model';
import { getSelectedAnimal } from '@store';

@Component({
  selector: 'app-medical-container',
  template: `
    <app-medical [currentAnimal]="selectedAnimal$ | async"></app-medical>
  `
})
export class MedicalContainerComponent implements OnInit {
  public selectedAnimal$: Observable<Livestock>;

  constructor(private store: Store<State>) {}

  public ngOnInit() {
    this.selectedAnimal$ = this.store.pipe(select(getSelectedAnimal));
  }
}
