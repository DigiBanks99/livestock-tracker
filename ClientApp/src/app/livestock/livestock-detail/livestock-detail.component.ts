import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute,  Params,  Router,  NavigationExtras } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import * as moment from 'moment';

import { Livestock } from './../livestock.model';
import { LiveStockType } from './../livestock-type.model';
import { LivestockService } from '../livestock.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'DD MMMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};
@Component({
  selector: 'app-livestock-detail',
  templateUrl: './livestock-detail.component.html',
  styleUrls: ['./livestock-detail.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }]
})
export class LivestockDetailComponent implements OnInit, OnDestroy {
  public livestockForm: FormGroup;
  public livestockTypes = LiveStockType;
  public currentAnimal: Livestock;
  public keys: number[];

  private editID: number;
  private editingStartedSubscription: Subscription;
  private soldChanged: Subscription;
  private birthDateChanged: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private livestockService: LivestockService,
    private snackbarSerive: MatSnackBar
  ) {
    this.keys = [0];
    const strKeys = Object.keys(this.livestockTypes).filter(Number);
    strKeys.forEach((strKey: string) => {
      this.keys.push(parseInt(strKey, 10));
    });
  }

  ngOnInit() {
    try {
      const idParamObservable = this.route.queryParamMap.pipe(
        map(params => params.get('id') || 'None')
      );
      this.editingStartedSubscription = idParamObservable.subscribe(
        (idParam: string) => {
          if (idParam === 'None') {
            this.initForm();
          } else {
            this.editID = +idParam;
            this.initForm();
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  public reset() {
    let type = LiveStockType.Cattle;
    let subspecies: string = null;
    let number: number = null;
    let birthDate = new Date();
    let purchaseDate = new Date();
    let purchasePrice: number = null;
    let arrivalWeight: number = null;
    let batchNumber: number = null;
    let sellPrice: number = null;
    let sold = false;
    let age = '0 days';

    const animal: Livestock = this.livestockService.getAnimal(this.editID);
    if (animal != null) {
      this.currentAnimal = animal;
      type = animal.type;
      subspecies = animal.subspecies;
      number = animal.number;
      birthDate = animal.birthDate;
      purchaseDate = animal.purchaseDate;
      purchasePrice = animal.purchasePrice;
      arrivalWeight = animal.arrivalWeight;
      batchNumber = animal.batchNumber;
      sellPrice = animal.sellPrice;
      sold = animal.sold;
      age = animal.getAge();
    } else {
      this.currentAnimal = null;
    }

    this.livestockForm.get('type').setValue(type);
    this.livestockForm.get('subspecies').setValue(subspecies);
    this.livestockForm.get('number').setValue(number);
    this.livestockForm.get('birthDate').setValue(moment(birthDate));
    this.livestockForm.get('purchaseDate').setValue(moment(purchaseDate));
    this.livestockForm.get('purchasePrice').setValue(purchasePrice);
    this.livestockForm.get('arrivalWeight').setValue(arrivalWeight);
    this.livestockForm.get('batchNumber').setValue(batchNumber);
    this.livestockForm.get('sellPrice').setValue(sellPrice);
    this.livestockForm.get('sold').setValue(sold);
    this.livestockForm.get('age').setValue(age);
    this.livestockForm.markAsPristine();
  }

  public getSvgIcon(animal: Livestock): string {
    return this.livestockService.getSvgIcon(animal);
  }

  public getSvgIconByType(type: string): string {
    return this.livestockService.getSvgIconByString(type);
  }

  public getValueOrDefault(lookup: LiveStockType) {
    if (isNullOrUndefined(lookup)) {
      return LiveStockType.Cattle;
    }

    return lookup;
  }

  public getHeaderText() {
    if (isNullOrUndefined(this.editID) || this.editID === 0) {
      return 'New Animal';
    } else {
      return 'Editing Animal';
    }
  }

  public submit() {
    let message = 'updated';
    if (isNullOrUndefined(this.editID)) {
      this.editID = 0;
      message = 'added';
    }

    const animal = new Livestock(
      this.editID,
      +this.livestockForm.get('type').value,
      this.livestockForm.get('subspecies').value,
      +this.livestockForm.get('number').value,
      this.livestockForm.get('birthDate').value,
      this.livestockForm.get('purchaseDate').value,
      +this.livestockForm.get('purchasePrice').value,
      +this.livestockForm.get('sellPrice').value,
      +this.livestockForm.get('arrivalWeight').value,
      +this.livestockForm.get('batchNumber').value
    );
    animal.sold = this.livestockForm.get('sold').value;
    if (!animal.sold) {
      animal.sellPrice = null;
    }

    if (this.editID > 0) {
      this.livestockService.updateAnimal(animal);
    } else {
      this.livestockService.addAnimal(animal);
    }

    this.snackbarSerive.open('Item ' + message + '!', 'Dismiss', {
      duration: 4000
    });
    this.router.navigate(['livestock']);
  }

  public sell() {

  }

  public kill() {

  }

  public showPrefix(elementID: string): boolean {
    if (isNullOrUndefined(elementID)) {
      return false;
    }

    const elem = document.querySelector('#' + elementID);
    if (isNullOrUndefined(elem)) {
      return false;
    } else if (elem === document.activeElement) {
      return true;
    }

    const value = this.livestockForm.get(elementID).value;
    if (isNullOrUndefined(value)) {
      return false;
    }

    return true;
  }

  private updateSellPriceCtrl(value: boolean) {
    const validators = [];
    const sellPriceCtrl = this.livestockForm.get('sellPrice');

    if (value) {
      validators.push(Validators.required);
      sellPriceCtrl.enable();
    } else {
      sellPriceCtrl.setValue(null);
      sellPriceCtrl.disable();
    }

    sellPriceCtrl.setValidators(validators);
    sellPriceCtrl.updateValueAndValidity();
    sellPriceCtrl.markAsTouched();
  }

  public initForm() {
    let type = LiveStockType.Cattle;
    let subspecies: string = null;
    let number: number = null;
    let birthDate = new Date();
    let purchaseDate = new Date();
    let purchasePrice: number = null;
    let arrivalWeight: number = null;
    let batchNumber: number = null;
    let sellPrice: number = null;
    let sold = false;
    let age = '0 days';

    const animal: Livestock = this.livestockService.getAnimal(this.editID);
    if (animal != null) {
      this.currentAnimal = animal;
      type = animal.type;
      subspecies = animal.subspecies;
      number = animal.number;
      birthDate = animal.birthDate;
      purchaseDate = animal.purchaseDate;
      purchasePrice = animal.purchasePrice;
      arrivalWeight = animal.arrivalWeight;
      batchNumber = animal.batchNumber;
      sellPrice = animal.sellPrice;
      sold = animal.sold;
      age = animal.getAge();

      if (!sold) {
        sellPrice = null;
      }
    } else {
      this.currentAnimal = null;
    }

    this.livestockForm = new FormGroup({
      type: new FormControl(type, [Validators.required]),
      subspecies: new FormControl(subspecies, []),
      number: new FormControl(number, [Validators.required]),
      birthDate: new FormControl(moment(birthDate), [Validators.required]),
      purchaseDate: new FormControl(moment(purchaseDate), [Validators.required]),
      purchasePrice: new FormControl(purchasePrice, [Validators.required]),
      arrivalWeight: new FormControl(arrivalWeight, [Validators.required]),
      batchNumber: new FormControl(batchNumber, [Validators.required]),
      sellPrice: new FormControl(sellPrice, []),
      sold: new FormControl(sold, [Validators.required]),
      age: new FormControl({ value: age, disabled: true })
    });

    this.updateSellPriceCtrl(sold);

    this.soldChanged = this.livestockForm
      .get('sold')
      .valueChanges.subscribe((value: boolean) => this.updateSellPriceCtrl(value));

      this.birthDateChanged = this.livestockForm.get('birthDate').valueChanges.subscribe((value: Date) => {
        const ageCtrl = this.livestockForm.get('age');
        const tempAnimal = new Livestock(0, LiveStockType.Cattle, null, 0, value, new Date(), null, null, null, null);
        ageCtrl.setValue(tempAnimal.getAge());
        ageCtrl.updateValueAndValidity();
        ageCtrl.markAsTouched();
      });
  }

  ngOnDestroy() {
    this.editingStartedSubscription.unsubscribe();
    this.soldChanged.unsubscribe();
    this.birthDateChanged.unsubscribe();
  }
}
