import { Component, ViewChild } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AnimalType } from '@core/models';

import { AnimalTypeSelectComponent } from './animal-type-select.component';

@Component({
  selector: 'app-test',
  template: `
    <form [formGroup]="form">
      <mat-form-field>
        <span class="value-type">{{ form.value.type }}</span>
        <app-animal-type-select
          formControlName="type"
          #typeSelect
        ></app-animal-type-select>
      </mat-form-field>
    </form>
  `
})
class TestComponent {
  public form: FormGroup;
  @ViewChild(AnimalTypeSelectComponent, { static: false, read: false })
  public typeSelect: AnimalTypeSelectComponent;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      type: new FormControl(-1)
    });
  }
}

describe('AnimalTypeSelectComponent', () => {
  let component: AnimalTypeSelectComponent;
  let fixture: ComponentFixture<AnimalTypeSelectComponent>;
  let hostComponent: TestComponent;
  let hostFixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnimalTypeSelectComponent, TestComponent],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        MatIconModule,
        MatSelectModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalTypeSelectComponent);
    component = fixture.componentInstance;

    hostFixture = TestBed.createComponent(TestComponent);
    hostComponent = hostFixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('value', () => {
    it('should set value to the value provided', () => {
      component.value = AnimalType.Chicken;
      expect(component.value).toBe(AnimalType.Chicken);

      component.value = AnimalType.Sheep;
      expect(component.value).toBe(AnimalType.Sheep);

      component.value = AnimalType.Chicken;
      expect(component.value).toBe(AnimalType.Chicken);
    });

    it('should emit stateChanges when set', fakeAsync(() => {
      const spy = jasmine.createSpy('stateChanges spy');
      const subscription = component.stateChanges.subscribe(spy);

      component.value = AnimalType.Chicken;
      fixture.detectChanges();
      tick();

      expect(spy).toHaveBeenCalled();
      subscription.unsubscribe();
    }));
  });

  describe('placeholder', () => {
    it('should set placeholder to the value provided', () => {
      component.placeholder = '';
      expect(component.placeholder).toBe('');

      component.placeholder = 'some test value';
      expect(component.placeholder).toBe('some test value');

      component.placeholder = 'some other test value';
      expect(component.placeholder).toBe('some other test value');
    });

    it('should emit stateChanges when set', fakeAsync(() => {
      const spy = jasmine.createSpy('stateChanges spy');
      const subscription = component.stateChanges.subscribe(spy);

      component.placeholder = 'some test value';
      fixture.detectChanges();
      tick();

      expect(spy).toHaveBeenCalled();
      subscription.unsubscribe();
    }));
  });

  describe('keys', () => {
    it('should contain all the AnimalType number values', () => {
      const expectedKeys = Object.keys(AnimalType)
        .filter(Number)
        .map(type => +type)
        .concat(0)
        .sort();

      expectedKeys.forEach(expectedKey => {
        expect(component.keys.indexOf(+expectedKey)).toBeGreaterThan(-1);
      });
    });
  });

  describe('in host', () => {
    it('should have span set to animal-type-select value', () => {
      hostFixture.detectChanges();

      hostComponent.typeSelect.writeValue(AnimalType.Cattle);
      hostFixture.detectChanges();

      const span = hostFixture.debugElement.query(By.css('.value-type'));

      expect(span.nativeElement.textContent).toEqual('0');

      hostComponent.typeSelect.writeValue(AnimalType.Chicken);
      hostFixture.detectChanges();

      expect(span.nativeElement.textContent).toEqual('3');
    });
  });
});
