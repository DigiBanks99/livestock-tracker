import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { PageEvent } from '@angular/material/paginator';
import { environment } from '@env/environment';
import { WeightTransaction } from '@weight/interfaces';

@Component({
  selector: 'app-weight-transaction-list',
  templateUrl: './weight-transaction-list.component.html',
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: environment.myFormats.medium }
  ]
})
export class WeightTransactionListComponent {
  @Input() public transactions: WeightTransaction[] = [];
  @Input() public isLoadingTransactions = false;
  @Input() public pageNumber = 0;
  @Input() public pageSize = environment.pageSize;
  @Input() public recordCount = 0;

  @Output() public readonly addTransaction = new EventEmitter<void>();
  @Output() public readonly deleteTransaction = new EventEmitter<number>();
  @Output() public readonly pageChanged = new EventEmitter<PageEvent>();

  private readonly _displayColumns: string[] = [
    'date',
    'weight',
    'unit',
    'star'
  ];

  public get displayedColumns(): string[] {
    return this._displayColumns;
  }

  public onAdd(): void {
    this.addTransaction.emit();
  }

  public onDelete(transactionId: number): void {
    this.deleteTransaction.emit(transactionId);
  }

  public onPage(event: PageEvent): void {
    this.pageChanged.emit(event);
  }
}
