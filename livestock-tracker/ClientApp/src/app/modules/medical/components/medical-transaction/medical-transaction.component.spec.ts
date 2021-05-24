import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MedicalTransaction } from '@core/models/medical-transaction.model';
import {
  MedicalTransactionService,
  MockMedicalService
} from '@medical/services';
import { SvgService } from '@svg/services';
import { CommandButtonTestingModule } from '@test/shared';

import { MedicalTransactionComponent } from './medical-transaction.component';

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

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj<Router>(Router.name, ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [
        MedicalTransactionComponent,
        MedicalTransactionContainerComponent,
        AnimalSelectContainerComponent
      ],
      providers: [
        { provide: MedicalTransactionService, useClass: MockMedicalService },
        { provide: Router, useValue: routerSpy },
        SvgService
      ],
      imports: [
        CommandButtonTestingModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatListModule,
        MatIconModule,
        MatOptionModule,
        MatPaginatorModule,
        MatTableModule,
        MatToolbarModule,
        MatSelectModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
