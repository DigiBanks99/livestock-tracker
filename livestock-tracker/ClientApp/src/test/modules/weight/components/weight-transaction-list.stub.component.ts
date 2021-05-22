import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { environment } from '@env/environment';
import { WeightTransaction } from '@weight/interfaces';

@Component({
  selector: 'app-weight-transaction-list',
  template: ''
})
export class WeightTransactionListStubComponent {
  @Input() public transactions: WeightTransaction[] = [];
  @Input() public isLoadingTransactions = false;
  @Input() public pageNumber = 0;
  @Input() public pageSize = environment.pageSize;
  @Input() public recordCount = 0;

  @Output() public addTransaction = new EventEmitter<void>();
  @Output() public deleteTransaction = new EventEmitter<number>();
  @Output() public pageChanged = new EventEmitter<PageEvent>();
}
