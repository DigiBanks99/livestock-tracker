import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Livestock } from '@app/core/models/livestock.model';
import { State, selectors } from '@store';

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
    this.selectedAnimal$ = this.store.pipe(
      select(selectors.animalSelectors.getSelectedAnimal)
    );
  }
}
