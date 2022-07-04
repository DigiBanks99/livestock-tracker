import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MedicineTypeService,
  MockMedicineTypeService
} from '@medical/services';
import { provideMockStore } from '@ngrx/store/testing';
import { CommandButtonTestingModule } from '@test/shared';

import { MedicineTypeDetailComponent } from './medicine-type-detail/medicine-type-detail.component';
import { MedicineTypeComponent } from './medicine-type.component';
import { MedicineStore } from '@medical/store';

describe('MedicineTypeComponent', () => {
  let component: MedicineTypeComponent;
  let fixture: ComponentFixture<MedicineTypeComponent>;

  beforeEach(waitForAsync(() => {
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
        CommandButtonTestingModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatToolbarModule,
        MatListModule,
        MatPaginatorModule,
        MatIconModule,
        MatDividerModule,
        MatFormFieldModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
