import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State, selectors } from '@store';
import { SelectAnimal } from '@animal-store/actions';
import { Livestock } from '@app/core/models/livestock.model';

@Component({
  selector: 'app-animal-select-container',
  templateUrl: './animal-select-container.component.html'
})
export class AnimalSelectContainerComponent implements OnInit {
  public animal$: Observable<Livestock>;
  public animals$: Observable<Livestock[]>;

  @Input() public disabled: boolean;

  constructor(private store: Store<State>) {}

  public ngOnInit() {
    this.animals$ = this.store.pipe(
      select(selectors.animalSelectors.getAnimals)
    );
    this.animal$ = this.store.pipe(
      select(selectors.animalSelectors.getSelectedAnimal)
    );
  }

  public onAnimalChanged(id: number) {
    this.store.dispatch(new SelectAnimal(id));
  }
}
