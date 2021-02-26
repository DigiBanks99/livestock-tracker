import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Animal, AnimalType, NullAnimal } from '@core/models';
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
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: environment.myFormats.short }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimalFormComponent {
  private _currentAnimal: Animal = null;

  @Input()
  public set currentAnimal(value: Animal) {
    this._currentAnimal = value;
    this.updateForm(this._currentAnimal);
  }
  public get currentAnimal(): Animal {
    return this._currentAnimal;
  }
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
    .map((type) => +type)
    .concat(0);
  public gapSize = '16px';

  private destroyed$ = new Subject();
  private calcAge$ = new Subject();

  public get birthDateCtrl(): AbstractControl {
    return this.animalForm.get(Constants.Controls.BIRTH_DATE);
  }

  public get dateOfDeathCtrl(): AbstractControl {
    return this.animalForm.get(Constants.Controls.DATE_OF_DEATH);
  }

  public get purchasePriceCtrl(): AbstractControl {
    return this.animalForm.get(Constants.Controls.PURCHASE_PRICE);
  }

  public get sellPriceCtrl(): AbstractControl {
    return this.animalForm.get(Constants.Controls.SELL_PRICE);
  }

  constructor(
    private formBuilder: FormBuilder,
    private ageCalculatorService: AgeCalculatorService
  ) {
    this.initForm();
    this.calcAge$.next();
  }

  public onNavigateBack() {
    this.navigateBack.emit();
  }

  public onSave(): void {
    if (this.animalForm.valid) {
      this.save.emit(this.animalForm.value);
    }
  }

  public showPrefix(value: any): boolean {
    return value != null;
  }

  public reset(animal: Animal): void {
    if (animal == null) {
      animal = new NullAnimal();
    }

    this.animalForm.reset();
    this.updateForm(animal);
  }

  private initForm(): void {
    this.animalForm = this.formBuilder.group({
      id: 0,
      type: [null, [Validators.required]],
      subspecies: [null, [Validators.required]],
      number: [null, [Validators.required]],
      birthDate: [null, [Validators.required]],
      purchaseDate: [null, [Validators.required]],
      purchasePrice: [null, [Validators.required]],
      arrivalWeight: [null, [Validators.required]],
      batchNumber: [null, [Validators.required]],
      sold: [null],
      sellPrice: [{ value: null, disabled: true }],
      sellDate: [{ value: null, disabled: true }],
      age: [
        {
          value: this.ageCalculatorService.calculateAge(new Date()),
          disabled: true
        }
      ],
      deceased: [null],
      dateOfDeath: [{ value: null, disabled: true }, []]
    });

    this.animalForm
      .get(Constants.Controls.SOLD)
      .valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe((value: boolean) => this.updateSoldCtrl(value));

    this.animalForm
      .get(Constants.Controls.DECEASED)
      .valueChanges.pipe(takeUntil(this.destroyed$))
      .subscribe((deceased: boolean) => {
        this.updateDateOfDeathCtrl(deceased);
      });

    merge(this.birthDateCtrl?.valueChanges, this.dateOfDeathCtrl?.valueChanges)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((_) => this.calcAge$.next());

    this.calcAge$.pipe(takeUntil(this.destroyed$)).subscribe((_) => {
      this.setControlValue(
        this.ageCalculatorService.calculateAge(
          this.birthDateCtrl?.value ?? new Date(),
          this.dateOfDeathCtrl?.value
        ),
        Constants.Controls.AGE
      );
    });
  }

  private updateForm(animal: Animal): void {
    if (animal == null) {
      animal = new NullAnimal();
    }

    this.animalForm.patchValue({
      id: animal.id,
      type: animal.type,
      subspecies: animal.subspecies,
      number: animal.number,
      birthDate: animal.birthDate,
      purchaseDate: animal.purchaseDate,
      purchasePrice: animal.purchasePrice,
      arrivalWeight: animal.arrivalWeight,
      batchNumber: animal.batchNumber,
      sold: animal.sold,
      sellPrice: animal.sold ? animal.sellPrice : null,
      sellDate: animal.sellDate,
      deceased: animal.deceased,
      dateOfDeath: animal.dateOfDeath
    });

    this.updateSoldCtrl(animal.sold);
    this.updateDateOfDeathCtrl(animal.deceased);

    this.animalForm.markAsPristine();
    this.animalForm.markAsUntouched();
  }

  private updateSoldCtrl(value: boolean): void {
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
}
