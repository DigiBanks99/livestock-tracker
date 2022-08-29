import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MedicineTypeService,
  MockMedicineTypeService
} from '@medical/services';
import { MedicineStore } from '@medical/store';
import { provideMockStore } from '@ngrx/store/testing';
import { CommandButtonTestingModule } from '@test/shared';

import { MedicineTypeDetailComponent } from './medicine-type-detail/medicine-type-detail.component';
import {
  MedicineTypeComponent,
  MedicineTypeComponentModule
} from './medicine-type.component';

describe('MedicineTypeComponent', () => {
  let component: MedicineTypeComponent;
  let fixture: ComponentFixture<MedicineTypeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MedicineTypeComponent, MedicineTypeDetailComponent],
        providers: [
          { provide: MedicineTypeService, useClass: MockMedicineTypeService },
          provideMockStore({
            selectors: [
              {
                selector: MedicineStore.Medicine.selectors.medicineTypes,
                value: []
              }
            ]
          })
        ],
        imports: [
          MedicineTypeComponentModule,

          // Testing modules
          CommandButtonTestingModule,
          NoopAnimationsModule
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
