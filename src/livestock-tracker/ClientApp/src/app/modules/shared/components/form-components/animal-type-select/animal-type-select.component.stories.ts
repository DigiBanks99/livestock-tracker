import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AnimalType } from '@core/models';
import { AnimalTypeSelectModule } from '@shared/components';
import { moduleMetadata, Story } from '@storybook/angular';

@Component({
  selector: 'app-host-component',
  template: ` <pre>
      Value: {{ form.controls.animalType.value | json }}
      Disabled: {{ form.controls.animalType.disabled | json }}
      Status: {{ form.controls.animalType.status | json }}
      Touched: {{ form.controls.animalType.touched | json }}
      Errors: {{ form.controls.animalType.errors | json }}
    </pre
    >
    <form [formGroup]="form">
      <mat-form-field>
        <mat-label *ngIf="!placeholder" for="animalType">{{ label }}</mat-label>
        <app-animal-type-select
          formControlName="animalType"
          [placeholder]="placeholder"
        ></app-animal-type-select>
      </mat-form-field>
    </form>`
})
class HostComponent {
  @Input() public label = 'The label';
  @Input() public placeholder = '';
  @Input() public set value(value: AnimalType) {
    this.form.patchValue({ animalType: value });
  }
  @Input() public set disabled(value: boolean) {
    if (value) {
      this.form.controls.animalType.disable();
    } else {
      this.form.controls.animalType.enable();
    }
  }
  @Input() public set required(value: boolean) {
    this.form.controls.animalType.clearValidators();
    if (value) {
      this.form.controls.animalType.setValidators([Validators.required]);
    }
  }
  public form: FormGroup = new FormGroup({
    animalType: new FormControl(null, [])
  });
}

export default {
  title: 'Forms/Animal Type Select',
  component: HostComponent,
  decorators: [
    moduleMetadata({
      declarations: [HostComponent],
      imports: [
        AnimalTypeSelectModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule
      ]
    })
  ]
};

const Template: Story<HostComponent> = (args: HostComponent) => ({
  component: HostComponent,
  props: args
});

export const Empty = Template.bind({});
export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true
};

export const Required = Template.bind({});
Required.args = {
  required: true
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: 'Animal Type'
};

export const WithValue = Template.bind({});
WithValue.args = {
  value: AnimalType.Pig
};
