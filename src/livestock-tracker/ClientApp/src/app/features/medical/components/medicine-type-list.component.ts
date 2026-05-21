import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MedicineType } from '@core/models';
import { MedicalStateService } from '../services/medical-state.service';
import { LoaderComponent } from '@shared/components/loader.component';

@Component({
  selector: 'app-medicine-type-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    LoaderComponent,
  ],
  template: `
    <div class="medicine-type-list">
      <h2>Medicine Types</h2>

      <app-loader [loading]="state.medicineTypesLoading()" />

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="add-form">
        <mat-form-field>
          <mat-label>Description</mat-label>
          <input matInput formControlName="description" />
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
          @if (editingId()) {
            Update
          } @else {
            Add
          }
        </button>
        @if (editingId()) {
          <button mat-button type="button" (click)="cancelEdit()">Cancel</button>
        }
      </form>

      <table mat-table [dataSource]="state.medicineTypes()">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>ID</th>
          <td mat-cell *matCellDef="let item">{{ item.id }}</td>
        </ng-container>

        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Description</th>
          <td mat-cell *matCellDef="let item">{{ item.description }}</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let item">
            <button mat-icon-button color="primary" (click)="onEdit(item)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="onDelete(item.id)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
  `,
  styles: [`
    .medicine-type-list {
      padding: 1.5rem;
      max-width: 600px;
    }
    .add-form {
      display: flex;
      gap: 1rem;
      align-items: baseline;
      margin-bottom: 1.5rem;
    }
    table {
      width: 100%;
    }
  `],
})
export class MedicineTypeListComponent implements OnInit {
  protected readonly state = inject(MedicalStateService);
  private readonly fb = inject(FormBuilder);

  readonly editingId = signal<number | null>(null);
  readonly displayedColumns = ['id', 'description', 'actions'];

  readonly form = this.fb.group({
    description: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.state.loadMedicineTypes();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const id = this.editingId();
      if (id) {
        this.state.updateMedicineType(id, { id, description: this.form.value.description! });
      } else {
        this.state.addMedicineType({ description: this.form.value.description! });
      }
      this.form.reset();
      this.editingId.set(null);
    }
  }

  onEdit(item: MedicineType): void {
    this.editingId.set(item.id);
    this.form.patchValue({ description: item.description });
  }

  onDelete(id: number): void {
    this.state.deleteMedicineType(id);
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.form.reset();
  }
}
