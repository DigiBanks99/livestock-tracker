import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineTypeComponent } from './medicine-type.component';
import { MedicineTypeService, MockMedicineTypeService } from './medicine-type.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MedicineTypeDetailComponent } from './medicine-type-detail/medicine-type-detail.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('MedicineTypeComponent', () => {
  let component: MedicineTypeComponent;
  let fixture: ComponentFixture<MedicineTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MedicineTypeComponent, MedicineTypeDetailComponent],
      providers: [{ provide: MedicineTypeService, useClass: MockMedicineTypeService }],
      imports: [
        ReactiveFormsModule,
        MatToolbarModule,
        MatListModule,
        MatPaginatorModule,
        MatIconModule,
        MatDividerModule,
        MatFormFieldModule
      ]
    })
      .compileComponents();
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
