import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule, NativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MedicalTransaction } from '@core/models/medical-transaction.model';
import { MedicalTransactionComponent } from '@medical/components/medical-transaction/medical-transaction.component';
import {
  MedicalTransactionService,
  MockMedicalService
} from '@medical/services/medical-transaction.service';
import {
  MedicineTypeService,
  MockMedicineTypeService
} from '@medical/services/medicine-type.service';
import { MockUnitService, UnitService } from '@unit/services/unit.service';

describe('MedicalTransactionComponent', () => {
  let component: MedicalTransactionComponent;
  let fixture: ComponentFixture<MedicalTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalTransactionComponent],
      providers: [
        { provide: MedicalTransactionService, useClass: MockMedicalService },
        { provide: UnitService, useClass: MockUnitService },
        { provide: MedicineTypeService, useClass: MockMedicineTypeService },
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
        NativeDateModule,
      ],
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MedicalTransactionComponent);
    component = fixture.componentInstance;
    component.medicalTransaction = new MedicalTransaction();
    component.medicalTransaction.animalID = 1;
    component.medicalTransaction.dose = 1;
    component.medicalTransaction.id = 1;
    component.medicalTransaction.medicineId = 1;
    component.medicalTransaction.transactionDate = new Date(Date.now());
    component.medicalTransaction.unitId = 1;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
