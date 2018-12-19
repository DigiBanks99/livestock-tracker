import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';

import * as moment from 'moment';

import { Livestock, getAge } from '../livestock.model';
import { LiveStockType } from '../livestock-type.model';
import { LivestockService } from '../livestock.service';
import { Location } from '@angular/common';

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
export class LivestockDetailComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public currentAnimal: Livestock;

  public livestockForm: FormGroup;
  public livestockTypes = LiveStockType;
  public keys: number[];

  private editID: number;
  private soldChanged: Subscription;
  private deceasedChanged: Subscription;
  private birthDateChanged: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private livestockService: LivestockService,
    private snackbarSerive: MatSnackBar
  ) {
    this.keys = [0];
    const strKeys = Object.keys(this.livestockTypes).filter(Number);
    strKeys.forEach((strKey: string) => {
      this.keys.push(parseInt(strKey, 10));
    });
  }

  public ngOnInit() {
    try {
      const idParam = this.route.snapshot.params['id'];
      if (idParam === 'None') {
        this.initForm();
      } else {
        this.editID = +idParam;
        this.initForm();
      }
    } catch (error) {
      console.error(error);
    }
  }

  public ngOnChanges() {
    this.initForm();
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
    let sellDate: Date = null;
    let sold = false;
    let age = '0 days';
    let deceased = false;
    let dateOfDeath: Date = null;

    const animal: Livestock = this.currentAnimal;
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
      age = getAge(animal);
      sellDate = animal.sellDate;
      deceased = animal.deceased;
      dateOfDeath = animal.dateOfDeath;
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
    this.livestockForm.get('sellDate').setValue(sellDate);
    this.livestockForm.get('deceased').setValue(deceased);
    this.livestockForm.get('dateOfDeath').setValue(dateOfDeath);
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
      animal.sellDate = null;
    } else {
      animal.sellDate = this.livestockForm.get('sellDate').value;
    }

    animal.deceased = this.livestockForm.get('deceased').value;
    if (!animal.deceased) {
      animal.dateOfDeath = null;
    } else {
      animal.dateOfDeath = this.livestockForm.get('dateOfDeath').value;
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

  public sell() {}

  public kill() {}

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
    let sellDate: Date = null;
    let sold = false;
    let age = '0 days';
    let deceased = false;
    let dateOfDeath: Date = null;

    const animal: Livestock = this.currentAnimal;
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
      age = getAge(animal);
      sellDate = animal.sellDate;
      deceased = animal.deceased;
      dateOfDeath = animal.dateOfDeath;

      if (!sold) {
        sellPrice = null;
      }
    }

    this.livestockForm = new FormGroup({
      type: new FormControl(type, [Validators.required]),
      subspecies: new FormControl(subspecies, []),
      number: new FormControl(number, [Validators.required]),
      birthDate: new FormControl(moment(birthDate), [Validators.required]),
      purchaseDate: new FormControl(moment(purchaseDate), [
        Validators.required
      ]),
      purchasePrice: new FormControl(purchasePrice, [Validators.required]),
      arrivalWeight: new FormControl(arrivalWeight, [Validators.required]),
      batchNumber: new FormControl(batchNumber, [Validators.required]),
      sold: new FormControl(sold, [Validators.required]),
      sellPrice: new FormControl({ value: sellPrice, disabled: true }, []),
      sellDate: new FormControl({ value: sellDate, disabled: true }, []),
      age: new FormControl({ value: age, disabled: true }),
      deceased: new FormControl(deceased, [Validators.required]),
      dateOfDeath: new FormControl({ value: dateOfDeath, disabled: true }, [])
    });

    this.updateSold(sold);
    this.updateDateOfDeathCtrl(deceased);

    this.soldChanged = this.livestockForm
      .get('sold')
      .valueChanges.subscribe((value: boolean) => this.updateSold(value));

    this.birthDateChanged = this.livestockForm
      .get('birthDate')
      .valueChanges.subscribe((value: Date) => {
        const ageCtrl = this.livestockForm.get('age');
        const tempAnimal = new Livestock(
          0,
          LiveStockType.Cattle,
          null,
          0,
          value,
          new Date(),
          null,
          null,
          null,
          null
        );
        ageCtrl.setValue(getAge(tempAnimal));
        ageCtrl.updateValueAndValidity();
        ageCtrl.markAsTouched();
      });

    this.deceasedChanged = this.livestockForm
      .get('deceased')
      .valueChanges.subscribe((value: boolean) =>
        this.updateDateOfDeathCtrl(value)
      );
  }

  public navigateBack() {
    this.location.back();
  }

  private updateSold(value: boolean) {
    const validators = [];
    const sellPriceCtrl = this.livestockForm.get('sellPrice');
    const sellDateCtrl = this.livestockForm.get('sellDate');

    if (value) {
      validators.push(Validators.required);
      sellPriceCtrl.enable();
      sellDateCtrl.enable();
    } else {
      sellPriceCtrl.setValue(null);
      sellPriceCtrl.disable();
      sellDateCtrl.setValue(null);
      sellDateCtrl.disable();
    }

    sellPriceCtrl.setValidators(validators);
    sellPriceCtrl.updateValueAndValidity();
    sellPriceCtrl.markAsTouched();

    sellDateCtrl.setValidators(validators);
    sellDateCtrl.updateValueAndValidity();
    sellDateCtrl.markAsTouched();
  }

  private updateDateOfDeathCtrl(value: boolean) {
    const validators = [];
    const dateOfDeathCtrl = this.livestockForm.get('dateOfDeath');

    if (value) {
      validators.push(Validators.required);
      dateOfDeathCtrl.enable();
    } else {
      dateOfDeathCtrl.setValue(null);
      dateOfDeathCtrl.disable();
    }

    dateOfDeathCtrl.setValidators(validators);
    dateOfDeathCtrl.updateValueAndValidity();
    dateOfDeathCtrl.markAsTouched();
  }

  ngOnDestroy() {
    this.soldChanged.unsubscribe();
    this.birthDateChanged.unsubscribe();
    this.deceasedChanged.unsubscribe();
  }
}
