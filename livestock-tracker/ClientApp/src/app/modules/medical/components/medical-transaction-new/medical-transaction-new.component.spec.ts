import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { getSelectedAnimalId, getUnits } from '@core/store/selectors';
import { medicineTypeStore } from '@medical/store';
import { provideMockStore } from '@ngrx/store/testing';

import { MedicalTransactionNewComponent } from './medical-transaction-new.component';

describe('MedicalTransactionNewComponent', () => {
  let component: MedicalTransactionNewComponent;
  let fixture: ComponentFixture<MedicalTransactionNewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MedicalTransactionNewComponent],
        providers: [
          provideMockStore({
            selectors: [
              { selector: getSelectedAnimalId, value: -1 },
              {
                selector: medicineTypeStore.selectors.getMedicineTypes,
                value: []
              },
              {
                selector: getUnits,
                value: []
              }
            ]
          })
        ],
        imports: [RouterTestingModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalTransactionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
