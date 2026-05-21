import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { FeedingTransaction } from '@core/models';
import { FeedStateService } from '../services/feed-state.service';
import { UnitStateService } from '../../unit/services/unit-state.service';

@Component({
  selector: 'app-feeding-transaction-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  template: `
    <div class="form-container">
      <h2>{{ isEditing ? 'Edit' : 'New' }} Feeding Transaction</h2>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="form-grid">
          <mat-form-field>
            <mat-label>Animal ID</mat-label>
            <input matInput type="number" formControlName="animalId" />
          </mat-form-field>

          <mat-form-field>
            <mat-label>Feed Type</mat-label>
            <mat-select formControlName="feedTypeId">
              @for (type of feedState.feedTypes(); track type.id) {
                <mat-option [value]="type.id">{{ type.description }}</mat-option>
              }
            </mat-select>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Quantity</mat-label>
            <input matInput type="number" formControlName="quantity" />
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
export class FeedingTransactionFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  protected readonly feedState = inject(FeedStateService);
  protected readonly unitState = inject(UnitStateService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  isEditing = false;
  private editId: number | null = null;

  readonly form = this.fb.group({
    animalId: [0, [Validators.required, Validators.min(1)]],
    feedTypeId: [0, [Validators.required]],
    quantity: [0, [Validators.required, Validators.min(0)]],
    unitId: [0, [Validators.required]],
    transactionDate: [new Date(), [Validators.required]],
  });

  ngOnInit(): void {
    this.feedState.loadFeedTypes();
    this.unitState.loadUnits();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.editId = +id;
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const transaction: Partial<FeedingTransaction> = {
        ...this.form.value,
        ...(this.editId ? { id: this.editId } : {}),
      } as Partial<FeedingTransaction>;
      this.feedState.saveTransaction(transaction);
      this.router.navigate(['/feed']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/feed']);
  }
}
