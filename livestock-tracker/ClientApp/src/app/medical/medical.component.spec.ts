import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalComponent } from './medical.component';
import { MedicalService, MockMedicalService } from './medical.service';
import { LivestockService, MockLivestockService } from '../livestock/livestock.service';
import { MatIconModule, MatSelectModule, MatOptionModule, MatPaginatorModule, MatToolbarModule, MatListModule, MatDatepickerModule } from '@angular/material';
import { MedicalTransactionComponent } from './medical-transaction/medical-transaction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MedicalComponent', () => {
  let component: MedicalComponent;
  let fixture: ComponentFixture<MedicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalComponent, MedicalTransactionComponent],
      providers: [
        { provide: MedicalService, useClass: MockMedicalService },
        { provide: LivestockService, useClass: MockLivestockService }
      ],
      imports: [
        ReactiveFormsModule,
        MatIconModule,
        MatSelectModule,
        MatOptionModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatListModule,
        MatDatepickerModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
