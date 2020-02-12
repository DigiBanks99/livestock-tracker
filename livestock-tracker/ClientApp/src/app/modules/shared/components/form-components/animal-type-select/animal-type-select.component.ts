import { Subject } from 'rxjs';

import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Optional,
  Output,
  Self
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NgControl
} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { AnimalType } from '@core/models';

const Selector = 'app-animal-type-select';

@Component({
  selector: Selector,
  templateUrl: './animal-type-select.component.html',
  styleUrls: ['./animal-type-select.components.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: AnimalTypeSelectComponent }
  ]
})
export class AnimalTypeSelectComponent
  implements MatFormFieldControl<AnimalType>, ControlValueAccessor, OnDestroy {
  public static nextId = 0;

  private readonly _keys: number[];
  private _placeholder: string;
  private _required: boolean;
  private _disabled: boolean;

  @Input()
  public get value(): AnimalType {
    return this.form.value.type;
  }
  public set value(v: AnimalType) {
    const type = v;
    this.form.setValue({ type });
    this.stateChanges.next();
    this.onChange(v);
  }

  @Input()
  public get placeholder(): string {
    return this._placeholder;
  }
  public set placeholder(v: string) {
    this._placeholder = v;
    this.stateChanges.next();
  }

  @Input()
  public get required(): boolean {
    return this._required;
  }
  public set required(v: boolean) {
    this._required = v;
    this.stateChanges.next();
  }

  @Input()
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(v: boolean) {
    this._disabled = v;
    if (v) {
      this.form.disable();
    } else {
      this.form.enable();
    }
    this.stateChanges.next();
  }

  @Output() change = new EventEmitter<AnimalType>();
  @HostBinding()
  public id = `animal-type-select-${AnimalTypeSelectComponent.nextId++}`;

  @HostBinding('class.mat-form-field-should-float')
  public get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @HostBinding('attr.aria-describedby') public describedBy = '';

  public form: FormGroup;
  public stateChanges: Subject<void>;
  public focused: boolean;
  public errorState: boolean;
  public controlType: string;
  public get empty(): boolean {
    return this.value < 0;
  }
  public get keys(): number[] {
    return this._keys;
  }
  public onChange = (value: AnimalType) => {
    this.errorState = value < 0;
    this.stateChanges.next();
  };
  public onTouched = () => {
    this.errorState = this.value < 0;
  };

  constructor(
    fb: FormBuilder,
    @Optional() @Self() public ngControl: NgControl,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>
  ) {
    this.form = fb.group({
      type: null
    });

    this._keys = Object.keys(AnimalType)
      .filter(Number)
      .map(type => +type)
      .concat(0)
      .sort();

    this._placeholder = '';
    this._required = false;
    this._disabled = false;
    this.stateChanges = new Subject<void>();
    this.focused = false;
    this.errorState = false;
    this.controlType = Selector;

    fm.monitor(elRef.nativeElement, true).subscribe((origin: FocusOrigin) => {
      this.focused = origin !== null;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  public setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  public onContainerClick(event: MouseEvent): void {
    const el = event.target as Element;
    if (el && el.tagName.toLowerCase() !== 'mat-select') {
      el.dispatchEvent(new Event('click'));
    }
  }

  public getSvgIconByType(type: number | AnimalType): string {
    switch (type) {
      case AnimalType.Cattle:
        return 'cow';
      case AnimalType.Chicken:
        return 'chicken';
      case AnimalType.Pig:
        return 'pig';
      case AnimalType.Sheep:
        return 'sheep';
      default:
        throw Error(type + ' not implemented');
    }
  }

  public getAnimalTypeDescription(type: number | AnimalType): string {
    return AnimalType[type];
  }

  public writeValue(v: AnimalType): void {
    this.value = v;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public ngOnDestroy(): void {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }
}
