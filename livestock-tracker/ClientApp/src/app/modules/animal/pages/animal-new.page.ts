import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { animalActions, animalStore } from '@animal/store/index';
import { Animal, AnimalType } from '@core/models';
import { AnimalState } from '@core/store';
import { select, Store } from '@ngrx/store';

@Component({
  template: `<app-animal-form
    [currentAnimal]="createAnimal"
    [isPending]="isPending$ | async"
    [error]="error$ | async"
    header="Add animal"
    successMessage="Animal created."
    (save)="onSave($event)"
    (navigateBack)="onNavigateBack()"
  ></app-animal-form>`
})
export class AnimalNewPage implements OnInit, OnDestroy {
  public isPending$: Observable<boolean>;
  public error$: Observable<Error>;
  private destroyed$ = new Subject();

  constructor(private store: Store<AnimalState>, private location: Location) {}

  public ngOnInit(): void {
    this.isPending$ = this.store.pipe(
      select(animalStore.selectors.animalsPendingState),
      takeUntil(this.destroyed$)
    );
    this.error$ = this.store.pipe(
      select(animalStore.selectors.getAnimalsError),
      takeUntil(this.destroyed$)
    );
  }

  public onSave(animal: Animal): void {
    this.store.dispatch(animalActions.actions.addItem(animal));
  }

  public onNavigateBack(): void {
    this.location.back();
  }

  public createAnimal(): Observable<Animal> {
    return of({
      id: 0,
      arrivalWeight: null,
      batchNumber: null,
      birthDate: new Date(),
      dateOfDeath: null,
      deceased: false,
      number: null,
      purchaseDate: new Date(),
      purchasePrice: null,
      sellDate: null,
      sellPrice: null,
      sold: false,
      subspecies: null,
      type: AnimalType.Cattle
    });
  }

  public ngOnDestroy(): void {
    this.destroyed$.complete();
  }
}
