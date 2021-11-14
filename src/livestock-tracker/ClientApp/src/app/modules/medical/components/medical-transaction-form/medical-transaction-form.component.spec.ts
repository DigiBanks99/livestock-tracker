import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule, NativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MedicalTransactionFormComponent } from '@medical/components/medical-transaction-form/medical-transaction-form.component';
import {
  MedicalTransactionService,
  MockMedicalService
} from '@medical/services';
import {
  MedicineTypeService,
  MockMedicineTypeService
} from '@medical/services/medicine-type.service';
import { AnimalSelectTestingModule } from '@test/shared';
import { MockUnitService, UnitService } from '@unit/services/unit.service';

describe('MedicalTransactionFormComponent', () => {
  let component: MedicalTransactionFormComponent;
  let fixture: ComponentFixture<MedicalTransactionFormComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MedicalTransactionFormComponent],
        providers: [
          { provide: MedicalTransactionService, useClass: MockMedicalService },
          { provide: UnitService, useClass: MockUnitService },
          { provide: MedicineTypeService, useClass: MockMedicineTypeService }
        ],
        imports: [
          AnimalSelectTestingModule,
          ReactiveFormsModule,
          BrowserAnimationsModule,
          MatCardModule,
          MatOptionModule,
          MatSelectModule,
          MatFormFieldModule,
          MatDatepickerModule,
          MatInputModule,
          MatIconModule,
          HttpClientTestingModule,
          NativeDateModule
        ]
      }).compileComponents();
    })
  );

  beforeEach(
    waitForAsync(() => {
      fixture = TestBed.createComponent(MedicalTransactionFormComponent);
      component = fixture.componentInstance;
      component.medicalTransaction = {
        animalId: 1,
        dose: 1,
        id: 1,
        medicineId: 1,
        transactionDate: new Date(Date.now()),
        unitId: 1
      };
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
