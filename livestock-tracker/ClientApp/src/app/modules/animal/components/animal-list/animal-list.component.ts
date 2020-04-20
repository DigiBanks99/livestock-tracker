import { EMPTY, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { PageEvent } from '@angular/material/paginator';
import { LivestockService } from '@animal/services/livestock.service';
import { animalStore } from '@animal/store';
import { FetchAnimals } from '@animal/store/animal.actions';
import { Animal } from '@core/models';
import { AppState } from '@core/store';
import { environment } from '@env/environment';
import { select, Store } from '@ngrx/store';
import { AgeCalculatorService } from '@shared/services/age-calculator.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AnimalListComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();

  @Input() public animals: Animal[];
  @Output() public remove = new EventEmitter<Animal>();
  @Output() public showDetail = new EventEmitter<number>();
  @Output() public addAnimal = new EventEmitter();

  public displayedColumns: string[] = ['type', 'number', 'age', 'sold'];

  public currentPage$: Observable<number> = EMPTY;
  public pageSize$: Observable<number> = EMPTY;
  public recordCount$: Observable<number> = EMPTY;

  constructor(
    private livestockService: LivestockService,
    private ageCalculatorService: AgeCalculatorService,
    private store: Store<AppState>
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(new FetchAnimals());

    this.pageSize$ = this.store.pipe(
      select(animalStore.selectors.getPageSize),
      takeUntil(this.destroyed$)
    );
    this.currentPage$ = this.store.pipe(
      select(animalStore.selectors.getCurrentPage),
      takeUntil(this.destroyed$)
    );
    this.recordCount$ = this.store.pipe(
      select(animalStore.selectors.getRecordCount),
      takeUntil(this.destroyed$)
    );
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public getSvgIcon(animal: Animal): string {
    return this.livestockService.getSvgIcon(animal);
  }

  public removeAnimal(selectedItems: MatListOption[]): void {
    for (const item of selectedItems) {
      this.remove.emit(item.value);
    }
  }

  public onEditAnimal(id: number): void {
    this.showDetail.emit(id);
  }

  public onAddAnimal(): void {
    this.addAnimal.emit();
  }

  public onPage(pageEvent: PageEvent): void {
    this.store.dispatch(
      new FetchAnimals(pageEvent.pageIndex, pageEvent.pageSize)
    );
  }

  public getAge(animal: Animal): string {
    return this.ageCalculatorService.calculateAge(
      animal.birthDate,
      animal.dateOfDeath
    );
  }
}
