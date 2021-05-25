import { Observable } from 'rxjs';

import { Component } from '@angular/core';
import { AnimalStore } from '@animal/store';
import { FetchAnimalsAction } from '@animal/store/animal.actions';
import { AppState } from '@core/store';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public readonly animalCount$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.animalCount$ = this.store.pipe(
      select(AnimalStore.selectors.getRecordCount)
    );

    store.dispatch(new FetchAnimalsAction());
  }
}
