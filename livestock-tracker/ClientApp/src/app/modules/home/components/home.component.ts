import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { Animal } from '@core/models';
import { AppState } from '@core/store';
import { getAnimalCount, getAnimals } from '@core/store/selectors';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public animals$: Observable<Animal[]>;
  public animalCount$: Observable<number>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.animals$ = this.store.pipe(select(getAnimals));
    this.animalCount$ = this.store.pipe(select(getAnimalCount));
  }
}
