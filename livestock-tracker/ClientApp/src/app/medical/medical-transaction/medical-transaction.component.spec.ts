import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalTransactionComponent } from './medical-transaction.component';
import { MatOptionModule, MatSelectModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, MatIconModule, NativeDateModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MockMedicalService, MedicalService } from '../medical.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MedicineTypeService, MockMedicineTypeService } from '../medicine-type/medicine-type.service';
import { UnitService, MockUnitService } from '../../unit/unit.service';
import { MedicalTransaction } from '../medical-transaction.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MedicalTransactionComponent', () => {
  let component: MedicalTransactionComponent;
  let fixture: ComponentFixture<MedicalTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalTransactionComponent],
      providers: [
        { provide: MedicalService, useClass: MockMedicalService },
        { provide: UnitService, useClass: MockUnitService },
        { provide: MedicineTypeService, useClass: MockMedicineTypeService }
      ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatOptionModule,
        MatSelectModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        MatIconModule,
        HttpClientTestingModule,
        NativeDateModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MedicalTransactionComponent);
    component = fixture.componentInstance;
    component.medicalTransaction = new MedicalTransaction();
    component.medicalTransaction.animalID = 1;
    component.medicalTransaction.dose = 1;
    component.medicalTransaction.id = 1;
    component.medicalTransaction.medicineTypeCode = 1;
    component.medicalTransaction.transactionDate = new Date(Date.now());
    component.medicalTransaction.unit = 1;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
