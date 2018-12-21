import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { Livestock, getAge } from '@livestock/livestock.model';
import { LiveStockType } from '@livestock/livestock-type.model';
import { LivestockService } from '@livestock/livestock.service';
import { MatSnackBar } from '@angular/material';

const Constants = {
  Controls: {
    ID: 'id',
    SELL_PRICE: 'sellPrice',
    SELL_DATE: 'sellDate',
    DATE_OF_DEATH: 'dateOfDeath',
    SOLD: 'sold',
    BIRTH_DATE: 'birthDate',
    AGE: 'age',
    DECEASED: 'deceased',
    TYPE: 'type',
    SUBSPECIES: 'subspecies',
    NUMBER: 'number',
    PURCHASE_DATE: 'purchaseDate',
    PURCHASE_PRICE: 'purchasePrice',
    ARRIVAL_WEIGHT: 'arrivalWeight',
    BATCH_NUMBER: 'batchNumber'
  }
};

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
  selector: 'app-livestock-form',
  templateUrl: './livestock-form.component.html',
  styleUrls: ['./livestock-form.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }]
})
export class LivestockFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public currentAnimal: Livestock = {
    id: undefined,
    number: null,
    birthDate: new Date(),
    type: LiveStockType.Cattle,
    arrivalWeight: null,
    batchNumber: null,
    dateOfDeath: null,
    deceased: false,
    purchaseDate: new Date(),
    purchasePrice: null,
    sellDate: null,
    sellPrice: null,
    sold: false,
    subspecies: null
  };
  @Input() public header: string;
  @Input() public successMessage: string;
  @Input() public isPending = false;
  @Input() public error: Error = null;
  @Output() public navigateBack = new EventEmitter();
  @Output() public save = new EventEmitter<Livestock>();

  public livestockForm: FormGroup;
  public livestockTypes = LiveStockType;
  public keys: number[] = Object.keys(LiveStockType)
    .filter(Number)
    .map(type => {
      const x = +type;
      return x;
    })
    .concat(0);

  private soldChanged: Subscription;
  private deceasedChanged: Subscription;
  private birthDateChanged: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private livestockService: LivestockService,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit() {
    this.initForm();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.currentAnimal) this.initForm();

    if (!this.livestockForm) this.initForm();

    if (!this.isPending && !this.livestockForm.pristine) {
      const snackBarOptions = { duration: 4000 };
      let message = '';
      if (this.error != null) message = `ERROR: ${this.error.message}`;
      else message = this.successMessage;

      setTimeout(() => {
        this.snackBar.open(message, 'Dismiss', snackBarOptions);
        this.onNavigateBack();
      });
    }
  }

  public ngOnDestroy() {
    if (this.soldChanged) this.soldChanged.unsubscribe();
    if (this.deceasedChanged) this.deceasedChanged.unsubscribe();
    if (this.birthDateChanged) this.birthDateChanged.unsubscribe();
  }

  public onNavigateBack() {
    this.navigateBack.emit();
  }

  public submit() {
    if (this.livestockForm.valid) {
      this.save.emit(this.livestockForm.value);
    }
  }

  public getSvgIcon(): string {
    const type = this.livestockForm.get(Constants.Controls.TYPE).value;
    return this.getSvgIconByType(type);
  }

  public getSvgIconByType(type: number): string {
    return this.livestockService.getSvgIconByType(type);
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

  public reset() {
    let id: number;
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
      id = animal.id;
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
      age = getAge(animal.birthDate);
      sellDate = animal.sellDate;
      deceased = animal.deceased;
      dateOfDeath = animal.dateOfDeath;
    } else {
      this.currentAnimal = null;
    }

    this.livestockForm.get(Constants.Controls.ID).setValue(id);
    this.livestockForm.get(Constants.Controls.TYPE).setValue(type);
    this.livestockForm.get(Constants.Controls.SUBSPECIES).setValue(subspecies);
    this.livestockForm.get(Constants.Controls.NUMBER).setValue(number);
    this.livestockForm
      .get(Constants.Controls.BIRTH_DATE)
      .setValue(moment(birthDate));
    this.livestockForm
      .get(Constants.Controls.PURCHASE_DATE)
      .setValue(moment(purchaseDate));
    this.livestockForm
      .get(Constants.Controls.PURCHASE_PRICE)
      .setValue(purchasePrice);
    this.livestockForm
      .get(Constants.Controls.ARRIVAL_WEIGHT)
      .setValue(arrivalWeight);
    this.livestockForm
      .get(Constants.Controls.BATCH_NUMBER)
      .setValue(batchNumber);
    this.livestockForm.get(Constants.Controls.SELL_PRICE).setValue(sellPrice);
    this.livestockForm.get(Constants.Controls.SOLD).setValue(sold);
    this.livestockForm.get(Constants.Controls.AGE).setValue(age);
    this.livestockForm.get(Constants.Controls.SELL_DATE).setValue(sellDate);
    this.livestockForm.get(Constants.Controls.DECEASED).setValue(deceased);
    this.livestockForm
      .get(Constants.Controls.DATE_OF_DEATH)
      .setValue(dateOfDeath);
    this.livestockForm.markAsPristine();
  }

  private initForm() {
    let id: number;
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
      id = animal.id;
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
      age = getAge(animal.birthDate);
      sellDate = animal.sellDate;
      deceased = animal.deceased;
      dateOfDeath = animal.dateOfDeath;

      if (!sold) {
        sellPrice = null;
      }
    }

    this.livestockForm = this.formBuilder.group({
      id: [id],
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
      .get(Constants.Controls.SOLD)
      .valueChanges.subscribe((value: boolean) => this.updateSold(value));

    this.birthDateChanged = this.livestockForm
      .get(Constants.Controls.BIRTH_DATE)
      .valueChanges.subscribe((newBirthDate: Date) => {
        const ageCtrl = this.livestockForm.get(Constants.Controls.AGE);
        ageCtrl.setValue(getAge(newBirthDate));
        ageCtrl.updateValueAndValidity();
        ageCtrl.markAsTouched();
      });

    this.deceasedChanged = this.livestockForm
      .get(Constants.Controls.DECEASED)
      .valueChanges.subscribe((value: boolean) =>
        this.updateDateOfDeathCtrl(value)
      );
  }

  private updateSold(value: boolean) {
    const validators = [];
    const sellPriceCtrl = this.livestockForm.get(Constants.Controls.SELL_PRICE);
    const sellDateCtrl = this.livestockForm.get(Constants.Controls.SELL_DATE);

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
    const dateOfDeathCtrl = this.livestockForm.get(
      Constants.Controls.DATE_OF_DEATH
    );

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
}
