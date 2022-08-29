import { CommonModule } from '@angular/common';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AnimalSelectTestingModule,
  LoaderTestingModule
} from '@test/shared';
import { WeightTransaction } from '@weight/interfaces';

import { WeightTransactionFormComponent } from './weight-transaction-form.component';

describe('WeightTransactionFormComponent', () => {
  let component: WeightTransactionFormComponent;
  let fixture: ComponentFixture<WeightTransactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeightTransactionFormComponent],
      imports: [
        AnimalSelectTestingModule,
        CommonModule,
        FlexLayoutModule,
        LoaderTestingModule,
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightTransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the save event when onSave is called', () => {
    const saveSpy = spyOn(component.save, 'emit');
    const expectedTransaction: WeightTransaction = {
      animalId: 1,
      id: 0,
      transactionDate: new Date('September 24, 2021 11:10:24'),
      weight: 88
    };

    component.form.patchValue(expectedTransaction);
    expect(component.form.value).toEqual(expectedTransaction);
    component.onSave();

    expect(saveSpy).toHaveBeenCalledOnceWith(expectedTransaction);
  });

  it('should reset the form changes when reset is called', () => {
    const transaction: WeightTransaction = {
      animalId: 1,
      id: 0,
      transactionDate: new Date('September 24, 2021 11:10:24'),
      weight: 88
    };
    component.form.patchValue(transaction);

    component.onReset();

    expect(component.form.value).toEqual({
      animalId: null,
      id: null,
      transactionDate: null,
      weight: null
    });
  });

  it('should update the animalId control on the form if animalId is set', () => {
    component.animalId = 5;

    expect(component.form.get('animalId').value).toEqual(5);
  });

  it('should update the form if the input transaction changes', () => {
    const transaction: WeightTransaction = {
      animalId: 1,
      id: 3,
      transactionDate: new Date('September 29, 2021 15:16:24'),
      weight: 120
    };
    component.transaction = transaction;

    fixture.detectChanges();
    expect(component.form.value).toEqual(transaction);
  });
});
