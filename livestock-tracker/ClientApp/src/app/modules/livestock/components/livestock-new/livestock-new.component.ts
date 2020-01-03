import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { animalStore } from '@animal-store';
import { Animal } from '@core/models/livestock.model';
import { AnimalState } from '@core/store';
import { actions } from '@livestock/store/animal.actions';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-livestock-new',
  templateUrl: './livestock-new.component.html'
})
export class LivestockNewComponent implements OnInit, OnDestroy {
  public isPending$: Observable<boolean>;
  public error$: Observable<Error>;
  private destroyed$ = new Subject();

  constructor(private store: Store<AnimalState>, private location: Location) {}

  public ngOnInit(): void {
    this.isPending$ = this.store.pipe(
      select(animalStore.selectors.getAnimalsPendingState),
      takeUntil(this.destroyed$)
    );
    this.error$ = this.store.pipe(
      select(animalStore.selectors.getAnimalsError),
      takeUntil(this.destroyed$)
    );
  }

  public onSave(animal: Animal): void {
    this.store.dispatch(actions.addItem(animal));
  }

  public onNavigateBack(): void {
    this.location.back();
  }

  public ngOnDestroy(): void {
    this.destroyed$.complete();
  }
}
