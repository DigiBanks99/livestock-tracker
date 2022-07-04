import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimalSelectModule, LoaderModule } from '@shared/components';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { LongAnimalList } from '@test/animal/test-data';
import { provideAnimalSelectMockStore } from '@test/shared/components/animal-select/animal-select.stub.store';

import { WeightTransactionFormComponent } from './weight-transaction-form.component';

export default <Meta>{
  title: 'Weight/Transaction/Form',
  component: WeightTransactionFormComponent,
  decorators: [
    moduleMetadata({
      declarations: [WeightTransactionFormComponent],
      imports: [
        AnimalSelectModule,
        BrowserAnimationsModule,
        CommonModule,
        FlexLayoutModule,
        LoaderModule,
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        ReactiveFormsModule
      ],
      providers: [provideAnimalSelectMockStore()]
    })
  ]
};

const Template: Story<WeightTransactionFormComponent> = (
  args: WeightTransactionFormComponent
) => ({
  component: WeightTransactionFormComponent,
  props: args
});

export const Pristine = Template.bind({});

export const IsLoading = Template.bind({});
IsLoading.args = <WeightTransactionFormComponent>{
  animalId: LongAnimalList[0].id,
  isLoading: true
};

export const IsSaving = Template.bind({});
IsSaving.args = <WeightTransactionFormComponent>{
  animalId: LongAnimalList[0].id,
  isLoading: false,
  isSaving: true
};
