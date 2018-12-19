import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '@app/store/animal.reducers';
import { Observable, Subscription } from 'rxjs';
import { Livestock } from '@livestock/livestock.model';
import {
  getAnimals,
  getFetchAnimalsPendingState,
  getFetchAnimalsError,
  getSelectedAnimalId
} from '@app/store';
import { RemoveAnimal, SelectAnimal } from '@app/store/animal.actions';

@Component({
  selector: 'app-livestock',
  templateUrl: './livestock.component.html',
  styleUrls: ['./livestock.component.scss']
})
export class LivestockComponent implements OnInit, OnDestroy {
  public showLandingPage = true;
  public toggle = false;
  public animals$: Observable<Livestock[]>;
  public selectedAnimal$: Observable<number>;
  public isFetching$: Observable<boolean>;
  public error$: Observable<Error>;

  private selecteAnimalSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.animals$ = this.store.pipe(select(getAnimals));
    this.selectedAnimal$ = this.store.pipe(select(getSelectedAnimalId));
    this.isFetching$ = this.store.pipe(select(getFetchAnimalsPendingState));
    this.error$ = this.store.pipe(select(getFetchAnimalsError));

    this.selecteAnimalSubscription = this.selectedAnimal$.subscribe(
      (id: number) => {
        if (id !== undefined || !this.route.snapshot.params['id']) return;

        const paramId = +this.route.snapshot.params['id'];
        this.store.dispatch(new SelectAnimal(paramId));
      }
    );
  }

  public deleteAnimal(animal: Livestock) {
    const r = confirm('Are you sure?');
    if (r) {
      this.store.dispatch(new RemoveAnimal(animal.id));
    }
  }

  public showDetail(id: number) {
    this.store.dispatch(new SelectAnimal(id));
    this.router.navigate(['livestock', id, 'edit']);
  }

  public addAnimal() {
    this.router.navigate(['new']);
  }

  public onActivate(event: any) {
    this.showLandingPage = false;
  }

  public onDeactivate(event: any) {
    this.showLandingPage = true;
  }

  public ngOnDestroy() {
    if (this.selecteAnimalSubscription)
      this.selecteAnimalSubscription.unsubscribe();
  }
}
