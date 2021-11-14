import { TestData } from 'test/modules/animal';
import { WeightTestData } from 'test/modules/weight';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { getAnimals, getSelectedAnimal } from '@core/store/selectors';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '@shared/shared.module';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

import { WeightTransactionListComponent } from './weight-transaction-list.component';

export default <Meta>{
  title: 'Weight/Transaction/List',
  component: WeightTransactionListComponent,
  decorators: [
    moduleMetadata({
      declarations: [WeightTransactionListComponent],
      imports: [
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatTableModule,
        MatToolbarModule,
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        provideMockStore({
          selectors: [
            { selector: getAnimals, value: [TestData.LongAnimalList] },
            { selector: getSelectedAnimal, value: TestData.LongAnimalList[0] }
          ]
        })
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
export const SmallList = Template.bind({});
SmallList.args = <WeightTransactionListComponent>{
  transactions: WeightTestData.SmallTransactionList
};

export const LargeList = Template.bind({});
LargeList.args = <WeightTransactionListComponent>{
  transactions: WeightTestData.LargeTransactionList
};
