import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgControl
} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { AnimalType } from '@core/models';
import { SvgService } from '@svg/services';

const Selector = 'app-animal-type-select';

@Component({
  selector: Selector,
  templateUrl: './animal-type-select.component.html',
  styleUrls: ['./animal-type-select.components.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MatFormFieldControl, useExisting: AnimalTypeSelectComponent }
  ],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ]
})
export class AnimalTypeSelectComponent
  implements
    MatFormFieldControl<AnimalType>,
    ControlValueAccessor,
    OnDestroy,
    OnInit {
  public static NEXT_ID = 0;

  private readonly _keys: number[] = Object.keys(AnimalType)
    .filter(Number)
    .map((type) => +type)
    .concat(0)
    .sort();
  private _placeholder: string;
  private _required = false;
  private _disabled = false;
  private _touched = false;
  private readonly _destroyed$ = new Subject<void>();

  @Input()
  public get value(): AnimalType | null {
    return this.form.controls.typeSelect.value;
  }
  public set value(value: AnimalType | null) {
    this.form.setValue({ typeSelect: value ?? null });
    this.stateChanges.next();
    this.onChange(value);
  }

  @Input()
  public get placeholder(): string {
    return this._placeholder;
  }
  public set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  @Input()
  public set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  public get required(): boolean {
    return this._required;
  }

  @Input()
  public set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled
      ? this.form.controls.typeSelect.disable()
      : this.form.controls.typeSelect.enable();
    this.stateChanges.next();
  }
  public get disabled(): boolean {
    return this._disabled;
  }

  @Output() public change = new EventEmitter<AnimalType>();

  @HostBinding()
  public readonly id = `animal-type-select-${AnimalTypeSelectComponent.NEXT_ID++}`;
  @HostBinding('attr.aria-describedby') public describedBy = '';
  @HostBinding('class.floating')
  public get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  public AnimalTypes = AnimalType;
  public form: FormGroup = new FormGroup({
    typeSelect: new FormControl(null)
  });
  public stateChanges = new Subject<void>();
  public focused = false;
  public controlType = Selector;

  public get empty(): boolean {
    return this.value < 0 || this.value == null;
  }

  public get keys(): number[] {
    return this._keys;
  }

  public get errorState(): boolean {
    return this._touched && !this.disabled && this.empty;
  }

  constructor(
    private svgService: SvgService,
    @Optional() @Self() public ngControl: NgControl,
    private focusMonitor: FocusMonitor,
    private elRef: ElementRef<HTMLElement>
  ) {
    this._placeholder = '';
    this.stateChanges = new Subject<void>();
    this.focused = false;

    focusMonitor
      .monitor(elRef.nativeElement, true)
      .pipe(takeUntil(this._destroyed$))
      .subscribe((origin: FocusOrigin) => {
        this.focused = origin !== null;
        this.stateChanges.next();
      });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  public onChange: (value: AnimalType) => void = (value: AnimalType): void => {
    this._onChange(value);
  };
  public onTouched: () => void = (): void => {
    this._onTouched();
  };

  private _onChange: (value: AnimalType) => void = (_: AnimalType): void => {
    this.stateChanges.next();
  };
  public _onTouched: () => void = (): void => {
    this._touched = true;
  };

  public getIcon(animalType: AnimalType): string {
    return this.svgService.getSvgIconByType(animalType);
  }

  public getAnimalTypeDescription(type: number | AnimalType): string {
    return AnimalType[type];
  }

  public ngOnDestroy(): void {
    this.stateChanges.complete();
    this.focusMonitor.stopMonitoring(this.elRef.nativeElement);
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public ngOnInit(): void {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
      this.disabled = this.ngControl.disabled;
    }
  }

  public onBlur(): void {
    this.onTouched();
  }

  public onContainerClick(event: MouseEvent): void {
    const el: Element = <Element>event.target;
    if (el && el.tagName.toLowerCase() !== 'mat-select') {
      el.dispatchEvent(new Event('click'));
    }
  }

  public registerOnChange(fn: (_: AnimalType) => void): void {
    if (typeof fn === 'function') {
      this.onChange = (args: AnimalType) => {
        this._onChange(args);
        fn(args);
      };
    }
  }

  public registerOnTouched(fn: () => void): void {
    if (typeof fn === 'function') {
      this.onTouched = () => {
        this._onTouched();
        fn();
      };
    }
  }

  public setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  public writeValue(animalType: AnimalType): void {
    this.value = animalType;
  }
}
