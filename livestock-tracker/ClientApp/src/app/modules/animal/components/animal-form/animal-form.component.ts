import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  private _currentAnimal$: Observable<Animal>;

  @Input()
  public get currentAnimal$(): Observable<Animal> {
    return this._currentAnimal$;
  }
  public set currentAnimal$(value$: Observable<Animal>) {
    this._currentAnimal$ = value$;
  }
  @Input() public header: string;
  @Input() public successMessage: string;
  @Input() public isPending = false;
  @Input() public error: Error = null;
  @Output() public navigateBack = new EventEmitter();
  @Output() public save = new EventEmitter<Animal>();

  public currentAnimal: Animal;
  public animalForm: FormGroup;
  public animalTypes = AnimalType;
  public keys: number[] = Object.keys(AnimalType)
    .filter(Number)
    .map(type => +type)
    .concat(0);

  private destroyed$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private livestockService: LivestockService,
    private snackBar: MatSnackBar,
    private ageCalculatorService: AgeCalculatorService
  ) {}

  public ngOnInit(): void {
    this.currentAnimal$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((animal: Animal) => {
        this.currentAnimal = animal;
        this.initForm(animal);
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    /*if (!this.isPending && this.animalForm && !this.animalForm.pristine) {
      const snackBarOptions = { duration: 4000 };
      let message = '';
      if (this.error != null) message = `ERROR: ${this.error.message}`;
      else message = this.successMessage;

      setTimeout(() => {
        this.snackBar.open(message, 'Dismiss', snackBarOptions);
        this.onNavigateBack();
      });
    }*/
  }

  public ngOnDestroy(): void {
    this.destroyed$.complete();
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

  public reset(animal: Animal): void {
    this.animalForm.get(Constants.Controls.ID).setValue(animal.id);
    this.animalForm.get(Constants.Controls.TYPE).setValue(animal.type);
    this.animalForm
      .get(Constants.Controls.SUBSPECIES)
      .setValue(animal.subspecies);
    this.animalForm.get(Constants.Controls.NUMBER).setValue(animal.number);
    this.animalForm
      .get(Constants.Controls.BIRTH_DATE)
      .setValue(moment(animal.birthDate));
    this.animalForm
      .get(Constants.Controls.PURCHASE_DATE)
      .setValue(moment(animal.purchaseDate));
    this.animalForm
      .get(Constants.Controls.PURCHASE_PRICE)
      .setValue(animal.purchasePrice);
    this.animalForm
      .get(Constants.Controls.ARRIVAL_WEIGHT)
      .setValue(animal.arrivalWeight);
    this.animalForm
      .get(Constants.Controls.BATCH_NUMBER)
      .setValue(animal.batchNumber);
    this.animalForm
      .get(Constants.Controls.SELL_PRICE)
      .setValue(animal.sellPrice);
    this.animalForm.get(Constants.Controls.SOLD).setValue(animal.sold);
    this.animalForm
      .get(Constants.Controls.AGE)
      .setValue(
        this.ageCalculatorService.calculateAge(
          animal.birthDate,
          animal.deceased ? animal.dateOfDeath : null
        )
      );
    this.animalForm.get(Constants.Controls.SELL_DATE).setValue(animal.sellDate);
    this.animalForm.get(Constants.Controls.DECEASED).setValue(animal.deceased);
    this.animalForm
      .get(Constants.Controls.DATE_OF_DEATH)
      .setValue(animal.dateOfDeath);
    this.animalForm.markAsPristine();
  }

  private initForm(animal: Animal): void {
    this.animalForm = this.formBuilder.group({
      id: [animal.id || 0],
      type: [animal.type, [Validators.required]],
      subspecies: new FormControl(animal.subspecies, []),
      number: new FormControl(animal.number, [Validators.required]),
      birthDate: new FormControl(moment(animal.birthDate), [
        Validators.required
      ]),
      purchaseDate: new FormControl(moment(animal.purchaseDate), [
        Validators.required
      ]),
      purchasePrice: new FormControl(animal.purchasePrice, [
        Validators.required
      ]),
      arrivalWeight: new FormControl(animal.arrivalWeight, [
        Validators.required
      ]),
      batchNumber: new FormControl(animal.batchNumber, [Validators.required]),
      sold: new FormControl(animal.sold, [Validators.required]),
      sellPrice: new FormControl(
        { value: animal.sold ? animal.sellPrice : null, disabled: true },
        []
      ),
      sellDate: new FormControl({ value: animal.sellDate, disabled: true }, []),
      age: new FormControl({
        value: this.ageCalculatorService.calculateAge(
          animal.birthDate,
          animal.dateOfDeath
        ),
        disabled: true
      }),
      deceased: new FormControl(animal.deceased, [Validators.required]),
      dateOfDeath: new FormControl(
        { value: animal.dateOfDeath, disabled: true },
        []
      )
    });

    this.updateSold(animal.sold);
    this.updateDateOfDeathCtrl(animal.deceased);

    this.animalForm
      .get(Constants.Controls.SOLD)
      .valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe((value: boolean) => this.updateSold(value));

    this.animalForm
      .get(Constants.Controls.BIRTH_DATE)
      .valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe((newBirthDate: Date) => {
        this.updateAgeCtrl(
          newBirthDate,
          this.animalForm.get(Constants.Controls.DECEASED).value
        );
      });

    this.animalForm
      .get(Constants.Controls.DECEASED)
      .valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe((value: boolean) => {
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
