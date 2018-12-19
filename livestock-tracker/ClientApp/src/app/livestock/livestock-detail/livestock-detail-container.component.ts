import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Livestock } from '../livestock.model';
import { Store, select } from '@ngrx/store';
import { State } from '@app/store/animal.reducers';
import { getSelectedAnimal } from '@app/store';

@Component({
  selector: 'app-livestock-detail-container',
  templateUrl: './livestock-detail-container.component.html'
})
export class LivestockDetailContainerComponent implements OnInit {
  public animal$: Observable<Livestock>;

  constructor(private store: Store<State>) {}

  public ngOnInit() {
    this.animal$ = this.store.pipe(select(getSelectedAnimal));
  }
}
