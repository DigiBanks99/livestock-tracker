import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animalStore } from '@animal-store';
import { Livestock } from '@core/models/livestock.model';
import { AppState } from '@core/store';
import { getAnimals, getSelectedAnimalId } from '@core/store/selectors';
import { RemoveAnimal, SelectAnimal } from '@livestock/store/animal.actions';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-livestock',
  templateUrl: './livestock.component.html',
  styleUrls: ['./livestock.component.scss']
})
export class LivestockComponent implements OnInit {
  public showLandingPage = true;
  public toggle = false;
  public animals$: Observable<Livestock[]>;
  public selectedAnimal$: Observable<number>;
  public isFetching$: Observable<boolean>;
  public error$: Observable<Error>;

  constructor(private store: Store<AppState>, private router: Router) {}

  public ngOnInit() {
    this.animals$ = this.store.pipe(select(getAnimals));
    this.selectedAnimal$ = this.store.pipe(select(getSelectedAnimalId));
    this.isFetching$ = this.store.pipe(
      select(animalStore.selectors.getFetchAnimalsPendingState)
    );
    this.error$ = this.store.pipe(
      select(animalStore.selectors.getAnimalsError)
    );
  }

  public deleteAnimal(animal: Livestock) {
    const response = confirm('Are you sure?');
    if (response) {
      this.store.dispatch(new RemoveAnimal(animal.id));
    }
  }

  public showDetail(id: number) {
    this.store.dispatch(new SelectAnimal(id));
    this.router.navigate(['livestock', id, 'edit']);
  }

  public addAnimal() {
    this.router.navigate(['/livestock', 'new']);
  }

  public onActivate(event: any) {
    this.showLandingPage = false;
  }

  public onDeactivate(event: any) {
    this.showLandingPage = true;
  }
}
