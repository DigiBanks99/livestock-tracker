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

import { MedicalTransactionDetailPage } from './medical-transaction-detail.page';

describe('MedicalTransactionDetailPage', () => {
  let component: MedicalTransactionDetailPage;
  let fixture: ComponentFixture<MedicalTransactionDetailPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MedicalTransactionDetailPage,
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
    fixture = TestBed.createComponent(MedicalTransactionDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
