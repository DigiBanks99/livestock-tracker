import { Observable } from 'rxjs';

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { animalStore } from '@animal-store';
import { Livestock } from '@app/core/models/livestock.model';
import { AppState } from '@core/store';
import { getSelectedAnimal } from '@core/store/selectors';
import { UpdateAnimal } from '@livestock/store/animal.actions';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-livestock-detail',
  templateUrl: './livestock-detail.component.html',
  styleUrls: ['./livestock-detail.component.scss']
})
export class LivestockDetailComponent implements OnInit {
  public animal$: Observable<Livestock>;
  public isPending$: Observable<boolean>;
  public error$: Observable<Error>;

  constructor(private store: Store<AppState>, private location: Location) {}

  public ngOnInit() {
    this.isPending$ = this.store.pipe(
      select(animalStore.selectors.getAnimalsPendingState)
    );
    this.error$ = this.store.pipe(
      select(animalStore.selectors.getAnimalsError)
    );
    this.animal$ = this.store.pipe(select(getSelectedAnimal));
  }

  public onSave(animal: Livestock) {
    this.store.dispatch(new UpdateAnimal(animal));
  }

  public onNavigateBack() {
    this.location.back();
  }
}
