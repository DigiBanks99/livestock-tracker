import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MedicineType } from '@core/models/medicine-type.model';

@Component({
  selector: 'app-medicine-type-detail',
  templateUrl: './medicine-type-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MedicineTypeDetailComponent {
  @Output() readonly save = new EventEmitter<MedicineType>();
  public medicineTypeForm = new FormGroup({
    id: new FormControl(null),
    description: new FormControl(null, {
      updateOn: 'blur',
      validators: Validators.required
    })
  });

  @Input() set medicineType(value: MedicineType) {
    this.medicineTypeForm.patchValue({
      id: value?.id ?? null,
      description: value?.description ?? null
    });
  }

  public onUpdate(): void {
    if (this.medicineTypeForm.valid) {
      this.save.emit(this.medicineTypeForm.value);
    }
  }
}

@NgModule({
  declarations: [MedicineTypeDetailComponent],
  exports: [MedicineTypeDetailComponent],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule]
})
export class MedicineTypeDetailComponentModule {}
