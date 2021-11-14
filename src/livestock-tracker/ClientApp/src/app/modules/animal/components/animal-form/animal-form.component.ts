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
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { LivestockTrackerDateAdapter } from '@core/dates';
import { Animal, AnimalType, NullAnimal } from '@core/models';
import { environment } from '@env/environment';
import { AgeCalculatorService } from '@shared/services/age-calculator.service';

const Constants = {
  controls: {
    id: 'id',
    sellPrice: 'sellPrice',
    sellDate: 'sellDate',
    dateOfDeath: 'dateOfDeath',
    sold: 'sold',
    birthDate: 'birthDate',
    age: 'age',
    deceased: 'deceased',
    type: 'type',
    subspecies: 'subspecies',
    number: 'number',
    purchaseDate: 'purchaseDate',
    purchasePrice: 'purchasePrice',
    arrivalWeight: 'arrivalWeight',
    batchNumber: 'batchNumber'
  }
};

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  providers: [
    { provide: DateAdapter, useClass: LivestockTrackerDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: environment.myFormats.short }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimalFormComponent {
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
  @Output() public archive = new EventEmitter<number>();
  @Output() public navigateBack = new EventEmitter();
  @Output() public save = new EventEmitter<Animal>();

  public form: FormGroup;
  public animalTypes = AnimalType;
  public keys: number[] = Object.keys(AnimalType)
    .filter(Number)
    .map((type) => +type)
    .concat(0);
  public gapSize = '16px';

  private _currentAnimal: Animal = null;
  private destroyed$ = new Subject();
  private calcAge$ = new Subject();

  public get birthDateCtrl(): AbstractControl {
    return this.form.get(Constants.controls.birthDate);
  }

  public get dateOfDeathCtrl(): AbstractControl {
    return this.form.get(Constants.controls.dateOfDeath);
  }

  public get purchasePriceCtrl(): AbstractControl {
    return this.form.get(Constants.controls.purchasePrice);
  }

  public get sellPriceCtrl(): AbstractControl {
    return this.form.get(Constants.controls.sellPrice);
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
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }

  public showPrefix(value: any): boolean {
    return value != null;
  }

  public reset(animal: Animal): void {
    if (animal == null) {
      animal = { ...new NullAnimal() };
    }

    this.form.reset();
    this.updateForm(animal);
  }

  public updateForm(animal: Animal): void {
    if (animal == null) {
      animal = { ...new NullAnimal() };
    }

    this.form.patchValue({
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

    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  public onArchive(): void {}

  public updateSoldCtrl(value: boolean): void {
    this.enableControlAndMakeRequiredWhenTrue(
      value,
      Constants.controls.sellPrice
    );
    this.enableControlAndMakeRequiredWhenTrue(
      value,
      Constants.controls.sellDate
    );
  }

  public updateDateOfDeathCtrl(value: boolean): void {
    this.enableControlAndMakeRequiredWhenTrue(
      value,
      Constants.controls.dateOfDeath
    );
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
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

    merge(this.birthDateCtrl?.valueChanges, this.dateOfDeathCtrl?.valueChanges)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.calcAge$.next());

    this.calcAge$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.setControlValue(
        this.ageCalculatorService.calculateAge(
          this.birthDateCtrl?.value ?? new Date(),
          this.dateOfDeathCtrl?.value
        ),
        Constants.controls.age
      );
    });
  }

  private enableControlAndMakeRequiredWhenTrue(
    value: boolean,
    controlName: string
  ): void {
    const validators = [];
    const control = this.form.get(controlName);

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
    const control = this.form.get(controlName);
    control.setValue(value);
    control.updateValueAndValidity();
    control.markAsTouched();
  }
}
