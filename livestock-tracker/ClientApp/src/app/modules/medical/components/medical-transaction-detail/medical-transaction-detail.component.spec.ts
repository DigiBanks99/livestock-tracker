import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MedicalTransaction } from '@core/models';
import { getSelectedAnimalId, getUnits } from '@core/store/selectors';
import { medicalTransactionStore, medicineTypeStore } from '@medical/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MedicalTransactionFormStubComponent } from '@test/medical';

import { MedicalTransactionDetailComponent } from './medical-transaction-detail.component';

describe('MedicalTransactionDetailComponent', () => {
  let component: MedicalTransactionDetailComponent;
  let fixture: ComponentFixture<MedicalTransactionDetailComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          MedicalTransactionDetailComponent,
          MedicalTransactionFormStubComponent
        ],
        providers: [
          provideMockStore({
            selectors: [
              { selector: getSelectedAnimalId, value: -1 },
              {
                selector: medicineTypeStore.selectors.getMedicineTypes,
                value: []
              },
              {
                selector:
                  medicalTransactionStore.selectors
                    .getSelectedMedicalTransaction,
                value: <MedicalTransaction>{
                  animalId: 1,
                  dose: 4,
                  id: 1,
                  medicineId: 1,
                  transactionDate: new Date(),
                  unitId: 1
                }
              },
              { selector: getUnits, value: [] }
            ]
          })
        ],
        imports: [NoopAnimationsModule, RouterTestingModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalTransactionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
