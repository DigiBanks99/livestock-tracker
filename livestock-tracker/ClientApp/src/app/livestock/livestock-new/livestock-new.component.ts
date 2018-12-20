import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '@animal-store/reducers';
import { AddAnimal } from '@animal-store/actions';
import { Livestock } from '@livestock/livestock.model';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { getAnimalsError, getAnimalsPendingState } from '@store';

@Component({
  selector: 'app-livestock-new',
  templateUrl: './livestock-new.component.html'
})
export class LivestockNewComponent implements OnInit {
  public isPending$: Observable<boolean>;
  public error$: Observable<Error>;

  constructor(private store: Store<State>, private location: Location) {}

  public ngOnInit() {
    this.isPending$ = this.store.pipe(select(getAnimalsPendingState));
    this.error$ = this.store.pipe(select(getAnimalsError));
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
