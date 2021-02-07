import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MedicalTransaction } from '@core/models/medical-transaction.model';
import { MedicalTransactionComponent } from '@medical/components/medical-transaction/medical-transaction.component';
import {
  MedicalTransactionService,
  MockMedicalService
} from '@medical/services';
import { SvgService } from '@svg/services';

@Component({
  selector: 'app-animal-select-container',
  template: '<div></div>'
})
class AnimalSelectContainerComponent {
  @Input() public disabled: boolean;
}

@Component({
  selector: 'app-medical-transaction-container',
  template: '<div></div>'
})
class MedicalTransactionContainerComponent {
  @Input() medicalTransaction: MedicalTransaction;
}

describe('MedicalTransactionComponent', () => {
  let component: MedicalTransactionComponent;
  let fixture: ComponentFixture<MedicalTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MedicalTransactionComponent,
        MedicalTransactionContainerComponent,
        AnimalSelectContainerComponent
      ],
      providers: [
        { provide: MedicalTransactionService, useClass: MockMedicalService },
        SvgService
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
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
