import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FeedStateService } from '../services/feed-state.service';
import { LoaderComponent } from '@shared/components/loader.component';
import { LookupPipe } from '@shared/pipes/lookup.pipe';

@Component({
  selector: 'app-feeding-transaction-list',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    LoaderComponent,
    LookupPipe,
  ],
  template: `
    <div class="transaction-list">
      <div class="list-header">
        <h2>Feeding Transactions</h2>
        <div class="header-actions">
          <a mat-button routerLink="types">Manage Feed Types</a>
          <a mat-raised-button color="primary" routerLink="new">
            <mat-icon>add</mat-icon> Add Transaction
          </a>
        </div>
      </div>

      <app-loader [loading]="state.transactionsLoading()" />

      <table mat-table [dataSource]="state.transactions()">
        <ng-container matColumnDef="animalId">
          <th mat-header-cell *matHeaderCellDef>Animal ID</th>
          <td mat-cell *matCellDef="let t">{{ t.animalId }}</td>
        </ng-container>

        <ng-container matColumnDef="feedType">
          <th mat-header-cell *matHeaderCellDef>Feed Type</th>
          <td mat-cell *matCellDef="let t">{{ t.feedTypeId | lookup:state.feedTypes() }}</td>
        </ng-container>

        <ng-container matColumnDef="quantity">
          <th mat-header-cell *matHeaderCellDef>Quantity</th>
          <td mat-cell *matCellDef="let t">{{ t.quantity }}</td>
        </ng-container>

        <ng-container matColumnDef="transactionDate">
          <th mat-header-cell *matHeaderCellDef>Date</th>
          <td mat-cell *matCellDef="let t">{{ t.transactionDate | date:'yyyy-MM-dd' }}</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let t">
            <a mat-icon-button [routerLink]="[t.id, 'edit']" color="primary">
              <mat-icon>edit</mat-icon>
            </a>
            <button mat-icon-button color="warn" (click)="onDelete(t.id, t.animalId)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <mat-paginator
        [length]="state.totalCount()"
        [pageSize]="10"
        [pageSizeOptions]="[5, 10, 25]"
        (page)="onPageChange($event)"
        showFirstLastButtons>
      </mat-paginator>
    </div>
  `,
  styles: [`
    .transaction-list {
      padding: 1.5rem;
    }
    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .header-actions {
      display: flex;
      gap: 0.5rem;
    }
    table {
      width: 100%;
    }
  `],
})
export class FeedingTransactionListComponent implements OnInit {
  protected readonly state = inject(FeedStateService);

  readonly displayedColumns = ['animalId', 'feedType', 'quantity', 'transactionDate', 'actions'];

  ngOnInit(): void {
    this.state.loadTransactions({ pageSize: 10, pageNumber: 0 });
    this.state.loadFeedTypes();
  }

  onDelete(id: number, animalId: number): void {
    this.state.deleteTransaction(id, animalId);
  }

  onPageChange(event: PageEvent): void {
    this.state.loadTransactions({ pageSize: event.pageSize, pageNumber: event.pageIndex });
  }
}
