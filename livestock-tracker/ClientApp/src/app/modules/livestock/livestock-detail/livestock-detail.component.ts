import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Livestock } from '@app/core/models/livestock.model';
import { Store, select } from '@ngrx/store';
import { UpdateAnimal } from '@animal-store/actions';
import { Observable } from 'rxjs';
import { selectors, State } from '@store';

@Component({
  selector: 'app-livestock-detail',
  templateUrl: './livestock-detail.component.html',
  styleUrls: ['./livestock-detail.component.scss']
})
export class LivestockDetailComponent implements OnInit {
  public animal$: Observable<Livestock>;
  public isPending$: Observable<boolean>;
  public error$: Observable<Error>;

  constructor(private store: Store<State>, private location: Location) {}

  public ngOnInit() {
    this.isPending$ = this.store.pipe(
      select(selectors.animalSelectors.getAnimalsPendingState)
    );
    this.error$ = this.store.pipe(
      select(selectors.animalSelectors.getAnimalsError)
    );
    this.animal$ = this.store.pipe(
      select(selectors.animalSelectors.getSelectedAnimal)
    );
  }

  public onSave(animal: Livestock) {
    this.store.dispatch(new UpdateAnimal(animal));
  }

  public onNavigateBack() {
    this.location.back();
  }
}
