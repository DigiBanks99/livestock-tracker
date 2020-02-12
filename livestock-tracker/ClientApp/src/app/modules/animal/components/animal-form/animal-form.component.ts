import * as moment from 'moment';
import { combineLatest, Observable, Subject } from 'rxjs';
import { skip, startWith, takeUntil, withLatestFrom } from 'rxjs/operators';

import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
export class AnimalFormComponent implements OnInit, OnDestroy {
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
  @Input() public isPending$: Observable<false>;
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

    this.isPending$
      .pipe(skip(1), takeUntil(this.destroyed$))
      .subscribe((isPending: boolean) => {
        if (!isPending) {
          this.handleSaved();
        }
      });
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
    this.animalForm.get(Constants.Controls.ID).reset(animal.id);
    this.animalForm.get(Constants.Controls.TYPE).reset(animal.type);
    this.animalForm.get(Constants.Controls.SUBSPECIES).reset(animal.subspecies);
    this.animalForm.get(Constants.Controls.NUMBER).reset(animal.number);
    this.animalForm
      .get(Constants.Controls.BIRTH_DATE)
      .reset(moment(animal.birthDate));
    this.animalForm
      .get(Constants.Controls.PURCHASE_DATE)
      .reset(moment(animal.purchaseDate));
    this.animalForm
      .get(Constants.Controls.PURCHASE_PRICE)
      .reset(animal.purchasePrice);
    this.animalForm
      .get(Constants.Controls.ARRIVAL_WEIGHT)
      .reset(animal.arrivalWeight);
    this.animalForm
      .get(Constants.Controls.BATCH_NUMBER)
      .reset(animal.batchNumber);
    this.animalForm.get(Constants.Controls.SELL_PRICE).reset(animal.sellPrice);
    this.animalForm.get(Constants.Controls.SOLD).reset(animal.sold);
    this.animalForm
      .get(Constants.Controls.AGE)
      .reset(
        this.ageCalculatorService.calculateAge(
          animal.birthDate,
          animal.deceased ? animal.dateOfDeath : null
        )
      );
    this.animalForm.get(Constants.Controls.SELL_DATE).reset(animal.sellDate);
    this.animalForm.get(Constants.Controls.DECEASED).reset(animal.deceased);
    this.animalForm
      .get(Constants.Controls.DATE_OF_DEATH)
      .reset(animal.dateOfDeath);
    this.animalForm.markAsPristine();
  }

  private initForm(animal: Animal): void {
    this.animalForm = this.formBuilder.group({
      id: [animal.id || 0],
      type: [animal.type, [Validators.required]],
      subspecies: [animal.subspecies, [Validators.required]],
      number: [animal.number, [Validators.required]],
      birthDate: [moment(animal.birthDate), [Validators.required]],
      purchaseDate: [moment(animal.purchaseDate), [Validators.required]],
      purchasePrice: [animal.purchasePrice, [Validators.required]],
      arrivalWeight: [animal.arrivalWeight, [Validators.required]],
      batchNumber: [animal.batchNumber, [Validators.required]],
      sold: [animal.sold, [Validators.required]],
      sellPrice: [
        { value: animal.sold ? animal.sellPrice : null, disabled: true },
        []
      ],
      sellDate: [{ value: animal.sellDate, disabled: true }, []],
      age: [
        {
          value: this.ageCalculatorService.calculateAge(
            animal.birthDate,
            animal.dateOfDeath
          ),
          disabled: true
        }
      ],
      deceased: [animal.deceased, [Validators.required]],
      dateOfDeath: [{ value: animal.dateOfDeath, disabled: true }, []]
    });

    this.updateSold(animal.sold);
    this.updateDateOfDeathCtrl(animal.deceased);

    this.animalForm
      .get(Constants.Controls.SOLD)
      .valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe((value: boolean) => this.updateSold(value));

    this.animalForm
      .get(Constants.Controls.DECEASED)
      .valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe((deceased: boolean) => {
        this.updateDateOfDeathCtrl(deceased);
      });

    combineLatest([
      this.animalForm
        .get(Constants.Controls.BIRTH_DATE)
        .valueChanges.pipe(startWith(animal.birthDate)),
      this.animalForm
        .get(Constants.Controls.DATE_OF_DEATH)
        .valueChanges.pipe(startWith(animal.dateOfDeath))
    ])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([birthDate, deceasedDate]) => {
        this.setControlValue(
          this.ageCalculatorService.calculateAge(birthDate, deceasedDate),
          Constants.Controls.AGE
        );
      });
  }

  private updateSold(value: boolean): void {
    this.enableControlAndMakeRequiredWhenTrue(
      value,
      Constants.Controls.SELL_PRICE
    );
    this.enableControlAndMakeRequiredWhenTrue(
      value,
      Constants.Controls.SELL_DATE
    );
  }

  private updateDateOfDeathCtrl(value: boolean): void {
    this.enableControlAndMakeRequiredWhenTrue(
      value,
      Constants.Controls.DATE_OF_DEATH
    );
  }

  private enableControlAndMakeRequiredWhenTrue(
    value: boolean,
    controlName: string
  ): void {
    const validators = [];
    const control = this.animalForm.get(controlName);

    if (value) {
      validators.push(Validators.required);
      control.enable();
    } else {
      control.setValue(null);
      control.disable();
    }

    control.setValidators(validators);
    control.updateValueAndValidity();
    control.markAsTouched();
  }

  private setControlValue<T>(value: T, controlName: string): void {
    const control = this.animalForm.get(controlName);
    control.setValue(value);
    control.updateValueAndValidity();
    control.markAsTouched();
  }

  private handleSaved() {
    const snackBarOptions = { duration: 4000 };
    const message = this.error
      ? `ERROR: ${this.error.message}`
      : this.successMessage;

    setTimeout(() => {
      this.snackBar.open(message, 'Dismiss', snackBarOptions);
      this.onNavigateBack();
    });
  }
}
