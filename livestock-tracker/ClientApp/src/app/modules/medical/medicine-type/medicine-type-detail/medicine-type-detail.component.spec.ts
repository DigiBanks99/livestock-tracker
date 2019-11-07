import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineTypeDetailComponent } from './medicine-type-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MedicineTypeService, MockMedicineTypeService } from '../medicine-type.service';
import { MedicineType } from '../../medicine-type.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MedicineTypeDetailComponent', () => {
  let component: MedicineTypeDetailComponent;
  let fixture: ComponentFixture<MedicineTypeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MedicineTypeDetailComponent],
      providers: [{ provide: MedicineTypeService, useClass: MockMedicineTypeService }],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineTypeDetailComponent);
    component = fixture.componentInstance;
    component.medicineType = new MedicineType();
    component.medicineType.typeCode = 1;
    component.medicineType.description = 'Some stuff';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
