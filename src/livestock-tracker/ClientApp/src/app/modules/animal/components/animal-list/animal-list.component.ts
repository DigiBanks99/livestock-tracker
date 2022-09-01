import {
  Observable,
  Subject
} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup
} from '@angular/forms';
import { MatListOption } from '@angular/material/list';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { AnimalOrderType } from '@animal/enums';
import { AnimalStore } from '@animal/store';
import {
  Animal,
  AnimalType,
  OrderOptions
} from '@core/models';
import { AppState } from '@core/store';
import { OrderingUtils } from '@core/utils';
import {
  select,
  Store
} from '@ngrx/store';
import { AgeCalculatorService } from '@shared/services/age-calculator.service';
import { SvgService } from '@svg/services/svg.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnDestroy {
  @Input() public set animals(value: Animal[]) {
    if (value == null) {
      return;
    }

    this._animals = value;
    this.updateFormArray(value);
  }
  public get animals(): Animal[] {
    return this._animals;
  }
  @Input() public isFetching = false;
  @Output() public readonly addAnimal = new EventEmitter();
  @Output() public readonly archive = new EventEmitter<number[]>();
  @Output() public readonly includeArchived = new EventEmitter<boolean>();
  @Output() public readonly orderChange = new EventEmitter<
    OrderOptions<AnimalOrderType>
  >();
  @Output() public readonly remove = new EventEmitter<Animal>();
  @Output() public readonly showDetail = new EventEmitter<number>();
  @Output() public readonly pageChange = new EventEmitter<PageEvent>();

  public readonly currentPage$: Observable<number>;
  public readonly pageSize$: Observable<number>;
  public readonly recordCount$: Observable<number>;

  public readonly AnimalType = AnimalType;

  private readonly _destroyed$ = new Subject<void>();

  private _animals: Animal[] = [];
  private _idArrayMap = new Map();
  private readonly _displayedColumns: string[] = [
    'archive',
    'type',
    'number',
    'age',
    'sold'
  ];
  private readonly _form = new FormGroup({
    archiveIds: new FormArray([])
  });

  public get animalIdsArray(): FormArray {
    return <FormArray>this.form.controls.archiveIds;
  }
  public get displayedColumns(): string[] {
    return this._displayedColumns;
  }
  public get form(): FormGroup {
    return this._form;
  }

  constructor(
    private svgService: SvgService,
    private ageCalculatorService: AgeCalculatorService,
    private store: Store<AppState>
  ) {
    this.pageSize$ = this.store.pipe(
      select(AnimalStore.selectors.getPageSize),
      takeUntil(this._destroyed$)
    );
    this.currentPage$ = this.store.pipe(
      select(AnimalStore.selectors.getCurrentPage),
      takeUntil(this._destroyed$)
    );
    this.recordCount$ = this.store.pipe(
      select(AnimalStore.selectors.getRecordCount),
      takeUntil(this._destroyed$)
    );
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public getArrayIndex(id: number): number {
    return this._idArrayMap.get(id);
  }

  public getSvgIcon(animal: Animal): string {
    return this.svgService.getSvgIcon(animal);
  }

  public removeAnimal(selectedItems: MatListOption[]): void {
    for (const item of selectedItems) {
      this.remove.emit(item.value);
    }
  }

  public onAddAnimal(): void {
    this.addAnimal.emit();
  }

  public onArchive(): void {
    const values: { selected: boolean }[] = <{ selected: boolean }[]>(
      this.animalIdsArray.value
    );

    const archivedIds: number[] = values
      .map((value: { selected: boolean }, index: number) => ({
        selected: value.selected,
        id: this._animals[index].id
      }))
      .filter((item) => item.selected)
      .map((item) => item.id);

    this.archive.emit(archivedIds);
  }

  public onEditAnimal(id: number): void {
    this.showDetail.emit(id);
  }

  public onPage(pageEvent: PageEvent): void {
    this.pageChange.emit(pageEvent);
  }

  public onSortChange(event: Sort): void {
    const property: AnimalOrderType = AnimalOrderType.getTypeFromString(
      event.active
    );
    const orderOptions: OrderOptions<AnimalOrderType> = {
      direction: OrderingUtils.getDirection(event),
      property
    };
    this.orderChange.emit(orderOptions);
  }

  public getAge(animal: Animal): string {
    return this.ageCalculatorService.calculateAge(
      animal.birthDate,
      animal.dateOfDeath
    );
  }

  private updateFormArray(animals: Animal[]): void {
    if (animals == null) {
      return;
    }

    this._idArrayMap = new Map();
    this.animalIdsArray.clear();
    this.animals.forEach((animal, index) => {
      this._idArrayMap.set(animal.id, index);
      this.animalIdsArray.insert(
        index,
        new FormGroup({
          selected: new FormControl(false),
          sold: new FormControl({ value: animal.sold, disabled: true })
        })
      );
    });
  }
}
