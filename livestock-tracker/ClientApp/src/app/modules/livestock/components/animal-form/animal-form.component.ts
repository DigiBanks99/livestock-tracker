import * as moment from 'moment';
import { Subscription } from 'rxjs';

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LivestockService } from '@animal/services';
import { Animal, AnimalType } from '@core/models';
import { environment } from '@env/environment';
import { AgeCalculatorService } from '@shared/services/age-calculator.service';

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

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: environment.myFormats.short }
  ]
})
export class AnimalFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public currentAnimal: Animal = {
    id: 0,
    number: null,
    birthDate: new Date(),
    type: AnimalType.Cattle,
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
  @Output() public save = new EventEmitter<Animal>();

  public animalForm: FormGroup;
  public animalTypes = AnimalType;
  public keys: number[] = Object.keys(AnimalType)
    .filter(Number)
    .map(type => +type)
    .concat(0);

  private soldChanged: Subscription;
  private deceasedChanged: Subscription;
  private birthDateChanged: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private livestockService: LivestockService,
    private snackBar: MatSnackBar,
    private ageCalculatorService: AgeCalculatorService
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentAnimal) this.initForm();

    if (!this.animalForm) this.initForm();

    if (!this.isPending && !this.animalForm.pristine) {
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

  public ngOnDestroy(): void {
    if (this.soldChanged) this.soldChanged.unsubscribe();
    if (this.deceasedChanged) this.deceasedChanged.unsubscribe();
    if (this.birthDateChanged) this.birthDateChanged.unsubscribe();
  }

  public onNavigateBack() {
    this.navigateBack.emit();
  }

  public submit(): void {
    if (this.animalForm.valid) {
      this.save.emit(this.animalForm.value);
    }
  }

  public getSvgIcon(): string {
    const type = this.animalForm.get(Constants.Controls.TYPE).value;
    return this.getSvgIconByType(type);
  }

  public getSvgIconByType(type: number): string {
    return this.livestockService.getSvgIconByType(type);
  }

  public showPrefix(elementID: string): boolean {
    if (elementID === undefined || elementID === null) {
      return false;
    }

    const elem = document.querySelector('#' + elementID);
    if (elem === undefined || elementID === null) {
      return false;
    } else if (elem === document.activeElement) {
      return true;
    }

    const value = this.animalForm.get(elementID).value;
    if (value === undefined || elementID === null) {
      return false;
    }

    return true;
  }

  public reset(): void {
    let id: number;
    let type = AnimalType.Cattle;
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

    const animal: Animal = this.currentAnimal;
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
      age = this.ageCalculatorService.calculateAge(
        animal.birthDate,
        animal.dateOfDeath
      );
      sellDate = animal.sellDate;
      deceased = animal.deceased;
      dateOfDeath = animal.dateOfDeath;
    } else {
      id = 0;
    }

    this.animalForm.get(Constants.Controls.ID).setValue(id);
    this.animalForm.get(Constants.Controls.TYPE).setValue(type);
    this.animalForm.get(Constants.Controls.SUBSPECIES).setValue(subspecies);
    this.animalForm.get(Constants.Controls.NUMBER).setValue(number);
    this.animalForm
      .get(Constants.Controls.BIRTH_DATE)
      .setValue(moment(birthDate));
    this.animalForm
      .get(Constants.Controls.PURCHASE_DATE)
      .setValue(moment(purchaseDate));
    this.animalForm
      .get(Constants.Controls.PURCHASE_PRICE)
      .setValue(purchasePrice);
    this.animalForm
      .get(Constants.Controls.ARRIVAL_WEIGHT)
      .setValue(arrivalWeight);
    this.animalForm.get(Constants.Controls.BATCH_NUMBER).setValue(batchNumber);
    this.animalForm.get(Constants.Controls.SELL_PRICE).setValue(sellPrice);
    this.animalForm.get(Constants.Controls.SOLD).setValue(sold);
    this.animalForm.get(Constants.Controls.AGE).setValue(age);
    this.animalForm.get(Constants.Controls.SELL_DATE).setValue(sellDate);
    this.animalForm.get(Constants.Controls.DECEASED).setValue(deceased);
    this.animalForm.get(Constants.Controls.DATE_OF_DEATH).setValue(dateOfDeath);
    this.animalForm.markAsPristine();
  }

  private initForm(): void {
    let id: number;
    let type = AnimalType.Cattle;
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

    const animal: Animal = this.currentAnimal;
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
      age = this.ageCalculatorService.calculateAge(
        animal.birthDate,
        animal.dateOfDeath
      );
      sellDate = animal.sellDate;
      deceased = animal.deceased;
      dateOfDeath = animal.dateOfDeath;

      if (!sold) {
        sellPrice = null;
      }
    } else {
      id = 0;
    }

    this.animalForm = this.formBuilder.group({
      id: new FormControl(id),
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

    this.soldChanged = this.animalForm
      .get(Constants.Controls.SOLD)
      .valueChanges.subscribe((value: boolean) => this.updateSold(value));

    this.birthDateChanged = this.animalForm
      .get(Constants.Controls.BIRTH_DATE)
      .valueChanges.subscribe((newBirthDate: Date) => {
        this.updateAgeCtrl(
          newBirthDate,
          this.animalForm.get(Constants.Controls.DECEASED).value
        );
      });

    this.deceasedChanged = this.animalForm
      .get(Constants.Controls.DECEASED)
      .valueChanges.subscribe((value: boolean) => {
        this.updateDateOfDeathCtrl(value);
        this.updateAgeCtrl(
          this.animalForm.get(Constants.Controls.BIRTH_DATE).value,
          this.animalForm.get(Constants.Controls.DATE_OF_DEATH).value
        );
      });
  }

  private updateSold(value: boolean): void {
    const validators = [];
    const sellPriceCtrl = this.animalForm.get(Constants.Controls.SELL_PRICE);
    const sellDateCtrl = this.animalForm.get(Constants.Controls.SELL_DATE);

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

  private updateDateOfDeathCtrl(value: boolean): void {
    const validators = [];
    const dateOfDeathCtrl = this.animalForm.get(
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

  private updateAgeCtrl(birthDate: Date, deceasedDate: Date): void {
    const ageCtrl = this.animalForm.get(Constants.Controls.AGE);
    ageCtrl.setValue(
      this.ageCalculatorService.calculateAge(birthDate, deceasedDate)
    );
    ageCtrl.updateValueAndValidity();
    ageCtrl.markAsTouched();
  }
}
