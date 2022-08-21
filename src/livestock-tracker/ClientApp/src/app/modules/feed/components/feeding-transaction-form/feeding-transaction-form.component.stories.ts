import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import {
  FeedingTransactionFormComponent,
  FeedingTransactionFormComponentModule
} from '@feed/components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeedTestData } from '@test/feed';
import { MockAnimalStoreModule } from '@test/animal';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { RouterTestingModule } from '@angular/router/testing';
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
  feedingTransaction: null,
  feedTypes: FeedTestData.Feed.SmallList,
  units: UnitTestData.ShortList
};

export const IsLoading: StoryFn<FeedingTransactionFormComponent> =
  Template.bind({});
IsLoading.args = {
  feedingTransaction: null,
  isLoading: true
};

export const IsSaving: StoryFn<FeedingTransactionFormComponent> = Template.bind(
  {}
);
IsSaving.args = {
  feedingTransaction: null,
  isSaving: true
};

export const ExistingTransaction: StoryFn<FeedingTransactionFormComponent> =
  Template.bind({});
ExistingTransaction.args = {
  feedingTransaction: FeedTestData.Transactions.SmallList[0],
  feedTypes: FeedTestData.Feed.SmallList,
  units: UnitTestData.ShortList
};
