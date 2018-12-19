import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '@app/store/animal.reducers';
import { Observable } from 'rxjs';
import { Livestock } from '@livestock/livestock.model';
import {
  getAnimals,
  getFetchAnimalsPendingState,
  getFetchAnimalsError,
  getSelectedAnimal
} from '@app/store';

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

  constructor(private store: Store<State>, private router: Router) {}

  ngOnInit() {
    this.animals$ = this.store.pipe(select(getAnimals));
    this.selectedAnimal$ = this.store.pipe(select(getSelectedAnimal));
    this.isFetching$ = this.store.pipe(select(getFetchAnimalsPendingState));
    this.error$ = this.store.pipe(select(getFetchAnimalsError));
  }

  public onAddAnimal() {
    this.router.navigate(['new']);
  }

  onActivate(event: any) {
    this.showLandingPage = false;
  }

  onDeactivate(event: any) {
    this.showLandingPage = true;
  }
}
