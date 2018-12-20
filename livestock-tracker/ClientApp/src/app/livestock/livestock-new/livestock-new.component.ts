import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '@animal-store/reducers';
import { AddAnimal } from '@animal-store/actions';
import { Livestock } from '@livestock/livestock.model';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-livestock-new',
  templateUrl: './livestock-new.component.html'
})
export class LivestockNewComponent {
  constructor(
    private store: Store<State>,
    private snackbarService: MatSnackBar,
    private router: Router,
    private location: Location
  ) {}

  public onSave(animal: Livestock) {
    const addAnimalAction = new AddAnimal();
    addAnimalAction.animal = animal;
    this.store.dispatch(addAnimalAction);

    this.snackbarService.open('Item update!', 'Dismiss', {
      duration: 4000
    });
    this.router.navigate(['livestock']);
  }

  public onNavigateBack() {
    this.location.back();
  }
}
