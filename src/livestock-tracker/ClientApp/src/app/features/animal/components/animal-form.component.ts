import { Component, inject, input, output, effect } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { Animal, AnimalType } from '@core/models';

@Component({
  selector: 'app-animal-form',
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
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="animal-form">
      <h2>{{ animal() ? 'Edit' : 'New' }} Animal</h2>

      <div class="form-grid">
        <mat-form-field>
          <mat-label>Number</mat-label>
          <input matInput type="number" formControlName="number" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Type</mat-label>
          <mat-select formControlName="type">
            @for (type of animalTypes; track type.value) {
              <mat-option [value]="type.value">{{ type.label }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Subspecies</mat-label>
          <input matInput formControlName="subspecies" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Birth Date</mat-label>
          <input matInput [matDatepicker]="birthPicker" formControlName="birthDate" />
          <mat-datepicker-toggle matIconSuffix [for]="birthPicker"></mat-datepicker-toggle>
          <mat-datepicker #birthPicker></mat-datepicker>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Purchase Date</mat-label>
          <input matInput [matDatepicker]="purchasePicker" formControlName="purchaseDate" />
          <mat-datepicker-toggle matIconSuffix [for]="purchasePicker"></mat-datepicker-toggle>
          <mat-datepicker #purchasePicker></mat-datepicker>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Purchase Price</mat-label>
          <input matInput type="number" formControlName="purchasePrice" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Arrival Weight</mat-label>
          <input matInput type="number" formControlName="arrivalWeight" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Batch Number</mat-label>
          <input matInput type="number" formControlName="batchNumber" />
        </mat-form-field>
      </div>

      <div class="form-actions">
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
          Save
        </button>
        <button mat-button type="button" (click)="cancel.emit()">Cancel</button>
      </div>
    </form>
  `,
  styles: [`
    .animal-form {
      padding: 1.5rem;
      max-width: 800px;
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
export class AnimalFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly animal = input<Animal | null>(null);
  readonly save = output<Partial<Animal>>();
  readonly cancel = output<void>();

  readonly animalTypes = [
    { value: AnimalType.Cattle, label: 'Cattle' },
    { value: AnimalType.Pig, label: 'Pig' },
    { value: AnimalType.Chicken, label: 'Chicken' },
    { value: AnimalType.Sheep, label: 'Sheep' },
  ];

  readonly form = this.fb.group({
    number: [0, [Validators.required]],
    type: [AnimalType.Cattle, [Validators.required]],
    subspecies: ['', [Validators.required]],
    birthDate: [new Date(), [Validators.required]],
    purchaseDate: [new Date(), [Validators.required]],
    purchasePrice: [0, [Validators.required, Validators.min(0)]],
    arrivalWeight: [0, [Validators.required, Validators.min(0)]],
    batchNumber: [0, [Validators.required]],
  });

  constructor() {
    effect(() => {
      const animal = this.animal();
      if (animal) {
        this.form.patchValue({
          number: animal.number,
          type: animal.type,
          subspecies: animal.subspecies,
          birthDate: animal.birthDate,
          purchaseDate: animal.purchaseDate,
          purchasePrice: animal.purchasePrice,
          arrivalWeight: animal.arrivalWeight,
          batchNumber: animal.batchNumber,
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const animal = this.animal();
      this.save.emit({
        ...this.form.value,
        ...(animal ? { id: animal.id } : {}),
      } as Partial<Animal>);
    }
  }
}
