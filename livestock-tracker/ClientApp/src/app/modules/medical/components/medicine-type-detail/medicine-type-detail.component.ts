import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MedicineType } from '@core/models/medicine-type.model';
import { MedicineTypeService } from '@medical/services/medicine-type.service';

@Component({
  selector: 'app-medicine-type-detail',
  templateUrl: './medicine-type-detail.component.html',
  styleUrls: ['./medicine-type-detail.component.scss'],
})
export class MedicineTypeDetailComponent implements OnInit {
  @Input() medicineType: MedicineType;
  @Output() save = new EventEmitter<MedicineType>();

  public medicineTypeForm: FormGroup;

  constructor(private medicineTypeService: MedicineTypeService) {
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
        validators: Validators.required,
      }),
    });
  }
}
