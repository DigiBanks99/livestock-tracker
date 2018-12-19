import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '@animal-store/reducers';
import { Observable } from 'rxjs';
import { Livestock } from '@livestock/livestock.model';
import { getSelectedAnimal, getAnimals } from '@store';
import { SelectAnimal } from '@animal-store/actions';

@Component({
  selector: 'app-animal-select-container',
  templateUrl: './animal-select-container.component.html'
})
export class AnimalSelectContainerComponent implements OnInit {
  public animal$: Observable<Livestock>;
  public animals$: Observable<Livestock[]>;

  constructor(private store: Store<State>) {}

  public ngOnInit() {
    this.animals$ = this.store.pipe(select(getAnimals));
    this.animal$ = this.store.pipe(select(getSelectedAnimal));
  }

  public onAnimalChanged(id: number) {
    this.store.dispatch(new SelectAnimal(id));
  }
}
