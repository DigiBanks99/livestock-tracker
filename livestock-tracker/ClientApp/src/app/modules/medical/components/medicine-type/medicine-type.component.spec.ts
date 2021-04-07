import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MedicineTypeDetailComponent } from '@medical/components/medicine-type-detail/medicine-type-detail.component';
import { MedicineTypeComponent } from '@medical/components/medicine-type/medicine-type.component';
import {
  MedicineTypeService,
  MockMedicineTypeService
} from '@medical/services/medicine-type.service';
import { medicineTypeStore } from '@medical/store';
import { provideMockStore } from '@ngrx/store/testing';

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
                selector: medicineTypeStore.selectors.getMedicineTypes,
                value: []
              }
            ]
          })
        ],
        imports: [
          NoopAnimationsModule,
          ReactiveFormsModule,
          MatToolbarModule,
          MatListModule,
          MatPaginatorModule,
          MatIconModule,
          MatDividerModule,
          MatFormFieldModule
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
