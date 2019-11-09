import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State, selectors } from '@store';
import { Livestock } from '@app/core/models/livestock.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public animals$: Observable<Livestock[]>;
  public animalCount$: Observable<number>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.animals$ = this.store.pipe(
      select(selectors.animalSelectors.getAnimals)
    );
    this.animalCount$ = this.store.pipe(
      select(selectors.animalSelectors.getAnimalCount)
    );
  }
}
