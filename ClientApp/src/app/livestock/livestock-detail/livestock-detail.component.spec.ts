import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatIconModule, MatDatepickerModule, MatInputModule, MatSelectModule, MatCheckboxModule, NativeDateModule, MatSnackBarModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { LivestockDetailComponent } from './livestock-detail.component';
import { LivestockService, MockLivestockService } from '../livestock.service';
import { LiveStockType } from '../livestock-type.model';
import { ActivatedRoute } from '@angular/router';

describe('LivestockDetailComponent', () => {
  let component: LivestockDetailComponent;
  let fixture: ComponentFixture<LivestockDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LivestockDetailComponent],
      providers: [{ provide: LivestockService, useClass: MockLivestockService }],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatDatepickerModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        NativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        MatSnackBarModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivestockDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('#getHeaderText should return New Animal', () => {
    expect(component.getHeaderText()).toBe('New Animal');
  });

  it ('#getHeaderText should return Editing Animal', () => {
    component['editID'] = 1;
    expect(component.getHeaderText()).toBe('Editing Animal');
  });

  it ('#getValueOrDefault should return correct value', () => {
    expect(component.getValueOrDefault(null)).toBe(LiveStockType.Cattle);
    expect(component.getValueOrDefault(LiveStockType.Pig)).toBe(LiveStockType.Pig);
  });

  it('#initForm should contain the required controls', () => {
    component.initForm();
    expect(component.livestockForm.get('type')).toBeTruthy();
    expect(component.livestockForm.get('subspecies')).toBeTruthy();
    expect(component.livestockForm.get('birthDate')).toBeTruthy();
    expect(component.livestockForm.get('purchaseDate')).toBeTruthy();
    expect(component.livestockForm.get('purchasePrice')).toBeTruthy();
    expect(component.livestockForm.get('number')).toBeTruthy();
    expect(component.livestockForm.get('arrivalWeight')).toBeTruthy();
    expect(component.livestockForm.get('batchNumber')).toBeTruthy();
    expect(component.livestockForm.get('sellPrice')).toBeTruthy();
    expect(component.livestockForm.get('sold')).toBeTruthy();
    expect(component.livestockForm.get('age')).toBeTruthy();
  });

  it('sellPrice control should be invalid required if sold and sellPrice is empty', () => {
    component.initForm();
    component.livestockForm.get('sold').setValue(true);
    const sellPriceCtrl = component.livestockForm.get('sellPrice');
    expect(sellPriceCtrl.invalid).toBe(true);
    expect(sellPriceCtrl.errors['required']).toBe(true);
  });

  it('sellPrice control should be valid if sold and sellPrice is not empty', () => {
    component.initForm();
    component.livestockForm.get('sold').setValue(true);
    const sellPriceCtrl = component.livestockForm.get('sellPrice');
    sellPriceCtrl.setValue(500);
    expect(sellPriceCtrl.invalid).toBe(false);
    expect(sellPriceCtrl.errors).toBeNull();
  });

  it('sellPrice control should be valid if not sold', () => {
    component.initForm();
    const sellPriceCtrl = component.livestockForm.get('sellPrice');
    component.livestockForm.get('sold').setValue(false);
    sellPriceCtrl.setValue(500);
    expect(sellPriceCtrl.invalid).toBe(false);
    expect(sellPriceCtrl.errors).toBeNull();

    sellPriceCtrl.setValue(null);
    expect(sellPriceCtrl.invalid).toBe(false);
    expect(sellPriceCtrl.errors).toBeNull();
  });
});
