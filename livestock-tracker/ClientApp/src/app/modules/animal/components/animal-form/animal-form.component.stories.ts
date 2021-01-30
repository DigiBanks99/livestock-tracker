import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimalFormComponent } from '@animal/components/animal-form/animal-form.component';
import { LoaderModule } from '@shared/components';
import { AgeCalculatorService } from '@shared/services';
import { moduleMetadata, Story } from '@storybook/angular';

export default {
  title: 'Animal/Form',
  component: AnimalFormComponent,
  decorators: [
    moduleMetadata({
      declarations: [AnimalFormComponent],
      imports: [
        BrowserAnimationsModule,
        LoaderModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        ReactiveFormsModule
      ],
      providers: [AgeCalculatorService]
    })
  ]
};

const Template: Story<AnimalFormComponent> = (args: AnimalFormComponent) => ({
  component: AnimalFormComponent,
  props: args
});

export const IsLoading = Template.bind({});
IsLoading.args = {
  isPending: true
};

export const Pristine = Template.bind({});
Pristine.args = {};
