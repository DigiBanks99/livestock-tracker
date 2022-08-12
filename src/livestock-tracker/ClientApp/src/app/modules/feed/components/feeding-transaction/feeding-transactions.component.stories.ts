import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import {
  FeedingTransactionsComponent,
  FeedingTransactionsComponentModule
} from './feeding-transactions.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UnitTestData } from '@test/unit';
import { FeedTestData } from '@test/feed';
import { MockAnimalStoreModule } from '@test/animal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default <Meta>{
  title: 'Feed/Transactions/List',
  component: FeedingTransactionsComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        FeedingTransactionsComponentModule,
        MockAnimalStoreModule,
        RouterTestingModule
      ]
    })
  ]
};

const Template: StoryFn<FeedingTransactionsComponent> = (
  args: FeedingTransactionsComponent
) => ({
  props: args
});

export const Default = <StoryFn<FeedingTransactionsComponent>>Template.bind({});
Default.args = {
  transactions: [],
  feedTypes: [...FeedTestData.Feed.SmallList],
  pageSize: 10,
  pageNumber: 0,
  recordCount: 0,
  units: [...UnitTestData.LongList]
};

export const WithData = <StoryFn<FeedingTransactionsComponent>>(
  Template.bind({})
);
WithData.args = {
  transactions: [...FeedTestData.Transactions.SmallList],
  feedTypes: [...FeedTestData.Feed.SmallList],
  pageSize: 10,
  pageNumber: 0,
  recordCount: 0,
  units: [...UnitTestData.LongList]
};

export const IsLoading = <StoryFn<FeedingTransactionsComponent>>(
  Template.bind({})
);
IsLoading.args = {
  isLoadingTransactions: true,
  transactions: [],
  feedTypes: [],
  pageSize: 10,
  pageNumber: 0,
  recordCount: 0,
  units: []
};
