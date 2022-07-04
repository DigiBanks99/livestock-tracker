import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MedicineType, Unit } from '@core/models';
import { MedicalTransaction } from '@core/models/medical-transaction.model';
import { environment } from '@env/environment';
import {
  AnimalSelectModule,
  CommandButtonComponentModule,
  LoaderModule
} from '@shared/components';
import { LookupPipeModule } from '@shared/pipes/lookup.pipe';

@Component({
  selector: 'app-medical-transaction',
  templateUrl: './medical-transaction.component.html',
  styleUrls: ['./medical-transaction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MedicalTransactionComponent {
  @Input() public transactions: MedicalTransaction[] = [];
  @Input() public medicineTypes: MedicineType[] = [];
  @Input() public units: Unit[] = [];
  @Input() public isLoadingTransactions = false;
  @Input() public pageNumber = 0;
  @Input() public pageSize = environment.pageSize;
  @Input() public recordCount = 0;

  @Output() public readonly addTransaction = new EventEmitter<void>();
  @Output() public readonly deleteTransaction = new EventEmitter<number>();
  @Output() public readonly pageChanged = new EventEmitter<PageEvent>();

  public get dateFormat(): string {
    return this._dateFormat;
  }
  public get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  private readonly _dateFormat: string =
    environment.myFormats.medium.display.datetimeInput;
  private readonly _displayedColumns: string[] = [
    'medicineType',
    'date',
    'dose',
    'unit',
    'star'
  ];

  public onAdd() {
    this.addTransaction.emit();
  }

  public onPage(pageEvent: PageEvent) {
    this.pageChanged.emit(pageEvent);
  }

  public onDelete(id: number) {
    this.deleteTransaction.emit(id);
  }
}

@NgModule({
  declarations: [MedicalTransactionComponent],
  exports: [MedicalTransactionComponent],
  imports: [
    AnimalSelectModule,
    CommonModule,
    CommandButtonComponentModule,
    FlexLayoutModule,
    LoaderModule,
    LookupPipeModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    RouterModule
  ]
})
export class MedicalTransactionComponentModule {}
