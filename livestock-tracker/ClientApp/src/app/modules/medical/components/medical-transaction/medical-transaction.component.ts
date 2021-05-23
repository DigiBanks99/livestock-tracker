import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Animal, MedicineType, NullAnimal, Unit } from '@core/models';
import { MedicalTransaction } from '@core/models/medical-transaction.model';

@Component({
  selector: 'app-medical-transaction',
  templateUrl: './medical-transaction.component.html',
  styleUrls: ['./medical-transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MedicalTransactionComponent {
  @Input() public set currentAnimal(value: Animal) {
    if (value != null) {
      this._currentAnimal = value;
    }
  }
  public get currentAnimal(): Animal {
    return this._currentAnimal;
  }
  @Input() public medicalTransactions: MedicalTransaction[];
  @Input() public medicineTypes: MedicineType[];
  @Input() public units: Unit[];
  @Input() public pageNumber: number;
  @Input() public pageSize: number;
  @Input() public recordCount: number;

  @Output() public add = new EventEmitter<number>();
  @Output() public page = new EventEmitter<PageEvent>();
  @Output() public remove = new EventEmitter<number>();

  public displayedColumns: string[] = [
    'medicineType',
    'date',
    'dose',
    'unit',
    'star'
  ];

  private _currentAnimal: Animal = NullAnimal.instance;

  public onAdd() {
    this.add.emit(this.currentAnimal.id);
  }

  public onPage(pageEvent: PageEvent) {
    this.page.emit(pageEvent);
  }

  public onRemove(id: number) {
    this.remove.emit(id);
  }
}
