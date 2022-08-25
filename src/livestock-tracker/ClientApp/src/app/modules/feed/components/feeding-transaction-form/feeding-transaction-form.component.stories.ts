import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  FeedingTransactionFormComponent,
  FeedingTransactionFormComponentModule
} from '@feed/components';
import {
  Meta,
  moduleMetadata,
  StoryFn
} from '@storybook/angular';
import { MockAnimalStoreModule } from '@test/animal';
import { FeedTestData } from '@test/feed';
import { UnitTestData } from '@test/unit';

export default <Meta>{
  title: 'Feed/Transactions/Form',
  component: FeedingTransactionFormComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        FeedingTransactionFormComponentModule,
        MockAnimalStoreModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
          useValue: { appearance: 'outline' }
        },
        {
          provide: MAT_DATE_LOCALE,
          useValue: 'en-US'
        }
      ]
    })
  ]
};

const Template: StoryFn<FeedingTransactionFormComponent> = (
  args: FeedingTransactionFormComponent
) => ({
  props: args
});

export const Default: StoryFn<FeedingTransactionFormComponent> = Template.bind(
  {}
);
Default.args = {
  transaction: null,
  feedTypes: FeedTestData.Feed.SmallList,
  units: UnitTestData.ShortList
};

export const IsLoading: StoryFn<FeedingTransactionFormComponent> =
  Template.bind({});
IsLoading.args = {
  transaction: null,
  isLoading: true
};

export const IsSaving: StoryFn<FeedingTransactionFormComponent> = Template.bind(
  {}
);
IsSaving.args = {
  transaction: null,
  isSaving: true
};

export const ExistingTransaction: StoryFn<FeedingTransactionFormComponent> =
  Template.bind({});
ExistingTransaction.args = {
  transaction: FeedTestData.Transactions.SmallList[0],
  feedTypes: FeedTestData.Feed.SmallList,
  units: UnitTestData.ShortList
};
