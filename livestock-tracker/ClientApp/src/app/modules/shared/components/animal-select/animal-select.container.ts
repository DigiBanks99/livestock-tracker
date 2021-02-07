import { Observable } from 'rxjs';

import { Component, Input, OnInit } from '@angular/core';
import { SelectAnimal } from '@animal/store/animal.actions';
import { Animal } from '@app/core/models/livestock.model';
import { AppState } from '@core/store';
import { getAnimals, getSelectedAnimal } from '@core/store/selectors';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-animal-select-container',
  template: `
    <app-animal-select
      [animal]="animal$ | async"
      [animals]="animals$ | async"
      (animalChanged)="onAnimalChanged($event)"
      [disabled]="disabled"
    ></app-animal-select>
  `
})
export class AnimalSelectContainer implements OnInit {
  public animal$: Observable<Animal>;
  public animals$: Observable<Animal[]>;

  @Input() public disabled: boolean;

  constructor(private store: Store<AppState>) {}

  public ngOnInit() {
    this.animals$ = this.store.pipe(select(getAnimals));
    this.animal$ = this.store.pipe(select(getSelectedAnimal));
  }

  public onAnimalChanged(id: number) {
    this.store.dispatch(new SelectAnimal(id));
  }
}
