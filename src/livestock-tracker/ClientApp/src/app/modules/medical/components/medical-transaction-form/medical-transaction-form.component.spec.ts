import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MedicalTransactionFormComponent,
  MedicalTransactionFormComponentModule
} from '@medical/components/medical-transaction-form/medical-transaction-form.component';
import {
  MedicalTransactionService,
  MockMedicalService
} from '@medical/services';
import {
  MedicineTypeService,
  MockMedicineTypeService
} from '@medical/services/medicine-type.service';
import { MockAnimalStoreModule } from '@test/animal';
import { AnimalSelectTestingModule } from '@test/shared';
import {
  MockUnitService,
  UnitService
} from '@unit/services/unit.service';

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
          MedicalTransactionFormComponentModule,

          //Testing modules
          AnimalSelectTestingModule,
          MockAnimalStoreModule,
          NoopAnimationsModule,
          RouterTestingModule
        ]
      }).compileComponents();
    })
  );

  beforeEach(
    waitForAsync(() => {
      fixture = TestBed.createComponent(MedicalTransactionFormComponent);
      component = fixture.componentInstance;
      component.transaction = {
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
