import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output
} from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FeedingTransaction, FeedType, Unit } from '@core/models';
import { environment } from '@env/environment';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  AnimalSelectModule,
  CommandButtonComponentModule,
  LoaderModule
} from '@shared/components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { LookupPipeModule } from '@shared/pipes/lookup.pipe';

@Component({
  selector: 'app-feeding-transactions',
  templateUrl: './feeding-transactions.component.html',
  styleUrls: ['./feeding-transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedingTransactionsComponent {
  @Input() public transactions: FeedingTransaction[] = [];
  @Input() public feedTypes: FeedType[] = [];
  @Input() public units: Unit[] = [];
  @Input() public isLoadingTransactions = false;
  @Input() public pageNumber = 0;
  @Input() public pageSize = environment.pageSize;
  @Input() public recordCount = 0;

  @Output() public readonly addTransaction = new EventEmitter<void>();
  @Output() public readonly deleteTransaction = new EventEmitter<number>();
  @Output() public readonly pageChanged = new EventEmitter<PageEvent>();
  private readonly _dateFormat: string =
    environment.myFormats.medium.display.datetimeInput;

  public get dateFormat(): string {
    return this._dateFormat;
  }

  public onAdd(): void {
    this.addTransaction.emit();
  }

  public onDelete(id: number) {
    this.deleteTransaction.emit(id);
  }

  public onPage(page: PageEvent) {
    this.pageChanged.emit(page);
  }
}

@NgModule({
  declarations: [FeedingTransactionsComponent],
  exports: [FeedingTransactionsComponent],
  imports: [
    AnimalSelectModule,
    CommandButtonComponentModule,
    CommonModule,
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
export class FeedingTransactionsComponentModule {}
