import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MedicineTypeService,
  MockMedicineTypeService
} from '@medical/services/medicine-type.service';

import {
  MedicineTypeDetailComponent,
  MedicineTypeDetailComponentModule
} from './medicine-type-detail.component';

describe('MedicineTypeDetailComponent', () => {
  let component: MedicineTypeDetailComponent;
  let fixture: ComponentFixture<MedicineTypeDetailComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MedicineTypeDetailComponent],
        providers: [
          { provide: MedicineTypeService, useClass: MockMedicineTypeService }
        ],
        imports: [
          MedicineTypeDetailComponentModule,

          // Testing modules
          NoopAnimationsModule
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineTypeDetailComponent);
    component = fixture.componentInstance;
    component.medicineType = { id: 1, description: 'Some stuff' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
