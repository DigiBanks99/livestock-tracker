import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { Livestock } from './../livestock.model';
import { LiveStockType } from './../livestock-type.model';
import { LivestockService } from '../livestock.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-livestock-detail',
  templateUrl: './livestock-detail.component.html',
  styleUrls: ['./livestock-detail.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class LivestockDetailComponent implements OnInit, OnDestroy {
  public livestockForm: FormGroup;
  public livestockTypes = LiveStockType;
  public currentAnimal: Livestock;
  public keys: number[];

  private editID: number;
  private editingStartedSubscription: Subscription;
  public soldChanged: Subscription;

  constructor(private route: ActivatedRoute, private livestockService: LivestockService) {
    this.keys = [0];
    const strKeys = Object.keys(this.livestockTypes).filter(Number);
    strKeys.forEach((strKey: string) => {
      this.keys.push(parseInt(strKey, 10));
    });
   }

  ngOnInit() {
    try {
      const idParamObservable = this.route.queryParamMap.pipe(map(params => params.get('id') || 'None'));
      this.editingStartedSubscription = idParamObservable.subscribe((idParam: string) => {
        if (idParam === 'None') {
          this.initForm();
        } else {
          this.editID = +idParam;
          this.initForm();
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  initForm() {
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
    let age: string = null;

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

    this.livestockForm = new FormGroup({
      'type': new FormControl(type, [Validators.required]),
      'subspecies': new FormControl(subspecies, []),
      'number': new FormControl(number, [Validators.required]),
      'birthDate': new FormControl(birthDate, [Validators.required]),
      'purchaseDate': new FormControl(purchaseDate, [Validators.required]),
      'purchasePrice': new FormControl(purchasePrice, [Validators.required]),
      'arrivalWeight': new FormControl(arrivalWeight, [Validators.required]),
      'batchNumber': new FormControl(batchNumber, [Validators.required]),
      'sellPrice': new FormControl(sellPrice, []),
      'sold': new FormControl(sold, [Validators.required]),
      'age': new FormControl({ value: age, disabled: true })
    });

    this.soldChanged = this.livestockForm.get('sold').valueChanges.subscribe((value: any) => {
      const validators = [];
      if (value) {
        validators.push(Validators.required);
      }

      const sellPriceCtrl = this.livestockForm.get('sellPrice');
      sellPriceCtrl.setValidators(validators);
      sellPriceCtrl.updateValueAndValidity();
      sellPriceCtrl.markAsTouched();
    });
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
    if (isNullOrUndefined(this.editID)) {
      return '(New)';
    } else {
      if (isNullOrUndefined(this.currentAnimal)) {
        const animal: Livestock = this.livestockService.getAnimal(this.editID);
        if (animal == null) {
          throw new Error('animal should not be null');
        } else {
          this.currentAnimal = animal;
        }
      }

      return this.currentAnimal.number + ' - ' + this.livestockTypes[this.currentAnimal.type];
    }
  }

  public submit() {
    console.log(this.livestockForm.value);
  }

  ngOnDestroy() {
    this.editingStartedSubscription.unsubscribe();
    this.soldChanged.unsubscribe();
  }
}
