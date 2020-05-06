import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Livestock } from '@app/core/models/livestock.model';
import { MedicineType, Unit } from '@core/models';
import { MedicalTransaction } from '@core/models/medical-transaction.model';

@Component({
  selector: 'app-medical-transaction',
  templateUrl: './medical-transaction.component.html',
  styleUrls: ['./medical-transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalTransactionComponent {
  @Input() public currentAnimal: Livestock;
  @Input() public medicalTransactions: MedicalTransaction[];
  @Input() public medicineTypes: MedicineType[];
  @Input() public units: Unit[];
  @Input() public pageNumber: number;
  @Input() public pageSize: number;
  @Input() public recordCount: number;

  @Output() public add = new EventEmitter<MedicalTransaction>();
  @Output() public page = new EventEmitter<PageEvent>();
  @Output() public remove = new EventEmitter<number>();

  public displayedColumns: string[] = [
    'medicineType',
    'date',
    'dose',
    'unit',
    'star',
  ];

  public onAdd(medicalTransaction: MedicalTransaction) {
    this.add.emit(medicalTransaction);
  }

  public onPage(pageEvent: PageEvent) {
    this.page.emit(pageEvent);
  }

  public onRemove(id: number) {
    this.remove.emit(id);
  }
}
