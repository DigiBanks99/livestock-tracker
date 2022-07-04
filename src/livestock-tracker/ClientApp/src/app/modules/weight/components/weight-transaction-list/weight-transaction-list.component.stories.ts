import { MockAnimalStoreModule } from 'test/modules/animal';
import { WeightTestData } from 'test/modules/weight';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/shared.module';
import { Meta, moduleMetadata, Story, StoryFn } from '@storybook/angular';

import { WeightTransactionListComponent } from './weight-transaction-list.component';
import { LoaderModule } from '@shared/components';

export default <Meta>{
  title: 'Weight/Transaction/List',
  component: WeightTransactionListComponent,
  decorators: [
    moduleMetadata({
      declarations: [WeightTransactionListComponent],
      imports: [
        BrowserAnimationsModule,
        LoaderModule,
        MatPaginatorModule,
        MatTableModule,
        MatToolbarModule,
        MockAnimalStoreModule,
        RouterTestingModule,
        SharedModule
      ]
    })
  ]
};

const Template: Story<WeightTransactionListComponent> = (
  args: WeightTransactionListComponent
) => ({
  component: WeightTransactionListComponent,
  props: args
});

export const Default = Template.bind({});
Default.args = {
  transactions: []
};

export const IsLoading = <StoryFn<WeightTransactionListComponent>>(
  Template.bind({})
);
IsLoading.args = {
  isLoadingTransactions: true,
  transactions: [],
  pageSize: 10,
  pageNumber: 0,
  recordCount: 0
};

export const SmallList = Template.bind({});
SmallList.args = <WeightTransactionListComponent>{
  transactions: WeightTestData.SmallTransactionList
};

export const LargeList = Template.bind({});
LargeList.args = <WeightTransactionListComponent>{
  transactions: WeightTestData.LargeTransactionList
};
