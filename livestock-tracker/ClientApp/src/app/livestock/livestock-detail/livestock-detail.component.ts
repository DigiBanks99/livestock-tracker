import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Livestock } from '@livestock/livestock.model';
import { Store, select } from '@ngrx/store';
import { State } from '@animal-store/reducers';
import { UpdateAnimal } from '@animal-store/actions';
import { Observable } from 'rxjs';
import { getAnimalsPendingState, getAnimalsError } from '@store';

@Component({
  selector: 'app-livestock-detail',
  templateUrl: './livestock-detail.component.html',
  styleUrls: ['./livestock-detail.component.scss']
})
export class LivestockDetailComponent implements OnInit {
  @Input() public currentAnimal: Livestock;

  public isPending$: Observable<boolean>;
  public error$: Observable<Error>;

  constructor(
    private store: Store<State>,
    private router: Router,
    private location: Location
  ) {}

  public ngOnInit() {
    this.isPending$ = this.store.pipe(select(getAnimalsPendingState));
    this.error$ = this.store.pipe(select(getAnimalsError));
  }

  public onSave(animal: Livestock) {
    this.store.dispatch(new UpdateAnimal(animal));
  }

  public onNavigateBack() {
    this.location.back();
  }
}
