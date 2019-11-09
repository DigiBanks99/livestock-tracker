import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { MedicineType } from '@core/models/medicine-type.model';
import { MedicineTypeService } from '@medical/medicine-type/medicine-type.service';

@Component({
  selector: 'app-medicine-type-detail',
  templateUrl: './medicine-type-detail.component.html',
  styleUrls: ['./medicine-type-detail.component.scss']
})
export class MedicineTypeDetailComponent implements OnInit, OnDestroy {
  @Input() medicineType: MedicineType;

  public medicineTypeForm: FormGroup;

  private onDescriptionChanged: Subscription;

  constructor(private medicineTypeService: MedicineTypeService) {
    this.medicineTypeForm = null;
  }

  ngOnInit() {
    this.initForm();
  }

  public deleteMedicineType(typecode: number) {
    this.medicineTypeService.deleteMedicineType(typecode);
  }

  private initForm() {
    this.medicineTypeForm = new FormGroup({
      description: new FormControl(this.medicineType.description, [
        Validators.required
      ])
    });

    this.onDescriptionChanged = this.medicineTypeForm
      .get('description')
      .valueChanges.subscribe((description: string) =>
        this.updateUnit(description)
      );
  }

  private updateUnit(descritpion: string) {
    this.medicineType.description = descritpion;
    this.medicineTypeService.updateMedicineType(this.medicineType);
  }

  ngOnDestroy() {
    if (!isNullOrUndefined(this.onDescriptionChanged)) {
      this.onDescriptionChanged.unsubscribe();
    }
  }
}
