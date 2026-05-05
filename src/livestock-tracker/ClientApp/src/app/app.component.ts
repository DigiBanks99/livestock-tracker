import { Component } from '@angular/core';
import { AnimalStore } from '@animal/store';
import { AppState } from '@core/store';
import { Store } from '@ngrx/store';
import { FetchUnitsAction } from '@unit/store/unit.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(store: Store<AppState>) {
    store.dispatch(new FetchUnitsAction());
    store.dispatch(AnimalStore.actions.fetchItems());
  }
}
