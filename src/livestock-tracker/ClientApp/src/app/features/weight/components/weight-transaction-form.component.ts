import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { WeightTransaction } from '@core/models';
import { WeightStateService } from '../services/weight-state.service';
import { UnitStateService } from '../../unit/services/unit-state.service';

@Component({
  selector: 'app-weight-transaction-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
  ],
  template: `
    <div class="form-container">
      <h2>{{ isEditing ? 'Edit' : 'New' }} Weight Record</h2>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="form-grid">
          <mat-form-field>
            <mat-label>Animal ID</mat-label>
            <input matInput type="number" formControlName="animalId" />
          </mat-form-field>

          <mat-form-field>
            <mat-label>Weight</mat-label>
            <input matInput type="number" formControlName="weight" />
          </mat-form-field>

          <mat-form-field>
            <mat-label>Unit</mat-label>
            <mat-select formControlName="unitId">
              @for (unit of unitState.units(); track unit.id) {
                <mat-option [value]="unit.id">{{ unit.description }}</mat-option>
              }
            </mat-select>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Date</mat-label>
            <input matInput [matDatepicker]="picker" formControlName="transactionDate" />
            <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
        </div>

        <div class="form-actions">
          <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
            Save
          </button>
          <button mat-button type="button" (click)="onCancel()">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      padding: 1.5rem;
      max-width: 600px;
    }
    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }
    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    }
  `],
})
export class WeightTransactionFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly state = inject(WeightStateService);
  protected readonly unitState = inject(UnitStateService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  isEditing = false;
  private editId: number | null = null;

  readonly form = this.fb.group({
    animalId: [0, [Validators.required, Validators.min(1)]],
    weight: [0, [Validators.required, Validators.min(0)]],
    unitId: [0, [Validators.required]],
    transactionDate: [new Date(), [Validators.required]],
  });

  ngOnInit(): void {
    this.unitState.loadUnits();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.editId = +id;
      this.state.selectTransaction(null);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const transaction: Partial<WeightTransaction> = {
        ...this.form.value,
        ...(this.editId ? { id: this.editId } : {}),
      } as Partial<WeightTransaction>;
      this.state.saveTransaction(transaction);
      this.router.navigate(['/weight']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/weight']);
  }
}
