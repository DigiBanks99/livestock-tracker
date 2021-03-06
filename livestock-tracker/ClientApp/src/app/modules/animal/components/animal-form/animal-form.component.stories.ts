import { TestData } from 'test/modules/animal';

import { FlexLayoutModule } from '@angular/flex-layout';
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
import { SharedModule } from '@shared/shared.module';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

const animalFormStories: Meta = {
  title: 'Animal/Form',
  component: AnimalFormComponent,
  decorators: [
    moduleMetadata({
      declarations: [AnimalFormComponent],
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        LoaderModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        SharedModule
      ],
      providers: [AgeCalculatorService]
    })
  ]
};

export default animalFormStories;

const birthDate = new Date(
  TestData.LongSubspecies.birthDate.getTime() - 45 * 24 * 60 * 60 * 1000
);

const todayLess16Days = new Date(
  new Date().getTime() - 16 * 24 * 60 * 60 * 1000
);

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

export const WithValue = Template.bind({});
WithValue.args = {
  currentAnimal: {
    ...TestData.LongSubspecies,
    birthDate
  },
  isPending: false,
  error: null
};

export const Sold = Template.bind({});
Sold.args = {
  currentAnimal: {
    ...TestData.LongSubspecies,
    birthDate,
    sold: true,
    sellPrice: 120,
    sellDate: todayLess16Days
  },
  isPending: false,
  error: null
};

export const Deceased = Template.bind({});
Deceased.args = {
  currentAnimal: {
    ...TestData.LongSubspecies,
    birthDate,
    deceased: true,
    dateOfDeath: todayLess16Days
  },
  isPending: false,
  error: null
};
