import { Component, input, output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Animal } from '@core/models';

@Component({
  selector: 'app-animal-select',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
  template: `
    <mat-form-field>
      <mat-label>Select Animal</mat-label>
      <mat-select (selectionChange)="selectionChange.emit($event.value)">
        @for (animal of animals(); track animal.id) {
          <mat-option [value]="animal.id">
            #{{ animal.number }} - {{ animal.subspecies }}
          </mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
})
export class AnimalSelectComponent {
  readonly animals = input<Animal[]>([]);
  readonly selectionChange = output<number>();
}
