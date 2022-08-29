import { LocationStrategy } from '@angular/common';
import { MockLocationStrategy } from '@angular/common/testing';
import {
  Component,
  Input
} from '@angular/core';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MedicalTransaction } from '@core/models/medical-transaction.model';
import {
  MedicalTransactionService,
  MockMedicalService
} from '@medical/services';
import { SvgService } from '@svg/services';
import { MockAnimalStoreModule } from '@test/animal';
import {
  AnimalSelectTestingModule,
  CommandButtonTestingModule
} from '@test/shared';

import {
  MedicalTransactionComponent,
  MedicalTransactionComponentModule
} from './medical-transaction.component';

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
        SvgService,
        { provide: LocationStrategy, useClass: MockLocationStrategy }
      ],
      imports: [
        MedicalTransactionComponentModule,

        // Testing modules
        AnimalSelectTestingModule,
        CommandButtonTestingModule,
        MockAnimalStoreModule,
        NoopAnimationsModule,
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
