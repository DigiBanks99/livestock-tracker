import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MedicineType } from '@core/models/medicine-type.model';
import {
  MedicineTypeService,
  MockMedicineTypeService
} from '@medical/services/medicine-type.service';

import { MedicineTypeDetailComponent } from './medicine-type-detail.component';

describe('MedicineTypeDetailComponent', () => {
  let component: MedicineTypeDetailComponent;
  let fixture: ComponentFixture<MedicineTypeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MedicineTypeDetailComponent],
      providers: [
        { provide: MedicineTypeService, useClass: MockMedicineTypeService }
      ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineTypeDetailComponent);
    component = fixture.componentInstance;
    component.medicineType = new MedicineType();
    component.medicineType.typeCode = 1;
    component.medicineType.description = 'Some stuff';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
