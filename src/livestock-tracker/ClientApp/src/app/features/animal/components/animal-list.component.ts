import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { Animal, AnimalType } from '@core/models';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
  ],
  template: `
    <div class="animal-list">
      <div class="list-header">
        <h2>Animals</h2>
        <a mat-raised-button color="primary" routerLink="new">
          <mat-icon>add</mat-icon> Add Animal
        </a>
      </div>

      <table mat-table [dataSource]="animals()">
        <ng-container matColumnDef="number">
          <th mat-header-cell *matHeaderCellDef>Number</th>
          <td mat-cell *matCellDef="let animal">{{ animal.number }}</td>
        </ng-container>

        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef>Type</th>
          <td mat-cell *matCellDef="let animal">{{ getAnimalTypeName(animal.type) }}</td>
        </ng-container>

        <ng-container matColumnDef="subspecies">
          <th mat-header-cell *matHeaderCellDef>Subspecies</th>
          <td mat-cell *matCellDef="let animal">{{ animal.subspecies }}</td>
        </ng-container>

        <ng-container matColumnDef="birthDate">
          <th mat-header-cell *matHeaderCellDef>Birth Date</th>
          <td mat-cell *matCellDef="let animal">{{ animal.birthDate | date:'yyyy-MM-dd' }}</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let animal">
            <a mat-icon-button [routerLink]="[animal.id, 'edit']" color="primary">
              <mat-icon>edit</mat-icon>
            </a>
            <button mat-icon-button color="warn" (click)="deleteAnimal.emit(animal.id)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <mat-paginator
        [length]="totalCount()"
        [pageSize]="10"
        [pageSizeOptions]="[5, 10, 25, 50]"
        (page)="pageChange.emit($event)"
        showFirstLastButtons>
      </mat-paginator>
    </div>
  `,
  styles: [`
    .animal-list {
      padding: 1rem;
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
export class AnimalListComponent {
  readonly animals = input<Animal[]>([]);
  readonly totalCount = input(0);
  readonly deleteAnimal = output<number>();
  readonly pageChange = output<PageEvent>();

  readonly displayedColumns = ['number', 'type', 'subspecies', 'birthDate', 'actions'];

  getAnimalTypeName(type: AnimalType): string {
    return AnimalType[type] ?? 'Unknown';
  }
}
