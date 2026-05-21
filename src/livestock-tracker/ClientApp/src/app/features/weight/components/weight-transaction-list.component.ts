import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WeightStateService } from '../services/weight-state.service';
import { LoaderComponent } from '@shared/components/loader.component';

@Component({
  selector: 'app-weight-transaction-list',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    LoaderComponent,
  ],
  template: `
    <div class="weight-list">
      <div class="list-header">
        <h2>Weight Transactions</h2>
        <a mat-raised-button color="primary" routerLink="new">
          <mat-icon>add</mat-icon> Add Weight Record
        </a>
      </div>

      <app-loader [loading]="state.loading()" />

      <table mat-table [dataSource]="state.transactions()">
        <ng-container matColumnDef="animalId">
          <th mat-header-cell *matHeaderCellDef>Animal ID</th>
          <td mat-cell *matCellDef="let t">{{ t.animalId }}</td>
        </ng-container>

        <ng-container matColumnDef="weight">
          <th mat-header-cell *matHeaderCellDef>Weight</th>
          <td mat-cell *matCellDef="let t">{{ t.weight }}</td>
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
    .weight-list {
      padding: 1.5rem;
    }
    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    table {
      width: 100%;
    }
  `],
})
export class WeightTransactionListComponent implements OnInit {
  protected readonly state = inject(WeightStateService);

  readonly displayedColumns = ['animalId', 'weight', 'transactionDate', 'actions'];

  ngOnInit(): void {
    this.state.loadTransactions({ pageSize: 10, pageNumber: 0 });
  }

  onDelete(id: number, animalId: number): void {
    this.state.deleteTransaction(id, animalId);
  }

  onPageChange(event: PageEvent): void {
    this.state.loadTransactions({ pageSize: event.pageSize, pageNumber: event.pageIndex });
  }
}
