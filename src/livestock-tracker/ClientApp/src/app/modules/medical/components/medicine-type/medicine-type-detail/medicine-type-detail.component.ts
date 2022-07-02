import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnInit,
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
  templateUrl: './medicine-type-detail.component.html'
})
export class MedicineTypeDetailComponent implements OnInit {
  @Input() medicineType: MedicineType;
  @Output() save = new EventEmitter<MedicineType>();

  public medicineTypeForm: FormGroup;

  constructor() {
    this.medicineTypeForm = null;
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public onUpdate(): void {
    if (this.medicineTypeForm.valid) {
      this.save.emit(this.medicineTypeForm.value);
    }
  }

  private initForm(): void {
    this.medicineTypeForm = new FormGroup({
      id: new FormControl(this.medicineType.id),
      description: new FormControl(this.medicineType.description, {
        updateOn: 'blur',
        validators: Validators.required
      })
    });
  }
}

@NgModule({
  declarations: [MedicineTypeDetailComponent],
  exports: [MedicineTypeDetailComponent],
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule]
})
export class MedicineTypeDetailComponentModule {}
