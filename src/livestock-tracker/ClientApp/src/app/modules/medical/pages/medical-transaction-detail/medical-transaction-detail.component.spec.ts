import { LocationStrategy } from '@angular/common';
import { MockLocationStrategy } from '@angular/common/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MedicalTransaction } from '@core/models';
import { getSelectedAnimalId, getUnits } from '@core/store/selectors';
import { MedicineStore } from '@medical/store';
import { provideMockStore } from '@ngrx/store/testing';
import {
  MedicalTransactionFormStubComponent,
  MedicineTestData
} from '@test/medical';

import { MedicalTransactionDetailComponent } from './medical-transaction-detail.component';

describe('MedicalTransactionDetailComponent', () => {
  let component: MedicalTransactionDetailComponent;
  let fixture: ComponentFixture<MedicalTransactionDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MedicalTransactionDetailComponent,
        MedicalTransactionFormStubComponent
      ],
      providers: [
        provideMockStore({
          selectors: [
            { selector: getSelectedAnimalId, value: 1 },
            {
              selector: MedicineStore.Medicine.selectors.medicineTypes,
              value: [...MedicineTestData.Medicine.SmallList]
            },
            {
              selector:
                MedicineStore.Transactions.selectors.selectedMedicalTransaction,
              value: <MedicalTransaction>{
                animalId: 1,
                dose: 4,
                id: 1,
                medicineId: 1,
                transactionDate: new Date(),
                unitId: 1
              }
            },
            {
              selector: MedicineStore.Transactions.selectors.isFetching,
              value: false
            },
            { selector: getUnits, value: [] }
          ]
        }),
        { provide: LocationStrategy, useClass: MockLocationStrategy }
      ],
      imports: [NoopAnimationsModule, RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalTransactionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});