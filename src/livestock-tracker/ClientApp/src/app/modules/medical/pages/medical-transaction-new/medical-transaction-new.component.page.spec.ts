import { LocationStrategy } from '@angular/common';
import { MockLocationStrategy } from '@angular/common/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { getSelectedAnimalId, getUnits } from '@core/store/selectors';
import { MedicineStore } from '@medical/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MedicalTransactionFormStubComponent } from '@test/medical';

import { MedicalTransactionNewPage } from './medical-transaction-new.page';

describe('MedicalTransactionNewPage', () => {
  let component: MedicalTransactionNewPage;
  let fixture: ComponentFixture<MedicalTransactionNewPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MedicalTransactionNewPage,
        MedicalTransactionFormStubComponent
      ],
      providers: [
        provideMockStore({
          selectors: [
            { selector: getSelectedAnimalId, value: -1 },
            {
              selector: MedicineStore.Medicine.selectors.medicineTypes,
              value: []
            },
            {
              selector: getUnits,
              value: []
            }
          ]
        }),
        { provide: LocationStrategy, useClass: MockLocationStrategy }
      ],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalTransactionNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
