import { Observable } from 'rxjs';

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { animalStore } from '@animal-store';
import { Livestock } from '@core/models/livestock.model';
import { AnimalState } from '@core/store';
import { AddAnimal } from '@livestock/store/animal.actions';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-livestock-new',
  templateUrl: './livestock-new.component.html'
})
export class LivestockNewComponent implements OnInit {
  public isPending$: Observable<boolean>;
  public error$: Observable<Error>;

  constructor(private store: Store<AnimalState>, private location: Location) {}

  public ngOnInit() {
    this.isPending$ = this.store.pipe(
      select(animalStore.selectors.getAnimalsPendingState)
    );
    this.error$ = this.store.pipe(
      select(animalStore.selectors.getAnimalsError)
    );
  }

  public onSave(animal: Livestock) {
    const addAnimalAction = new AddAnimal();
    addAnimalAction.animal = animal;
    this.store.dispatch(addAnimalAction);
  }

  public onNavigateBack() {
    this.location.back();
  }
}
