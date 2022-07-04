import {
  MedicalTransactionComponent,
  MedicalTransactionComponentModule
} from '@medical/components/medical-transaction/medical-transaction.component';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MedicineTestData } from '@test/medical';
import { MockAnimalStoreModule } from '@test/animal';
import { UnitTestData } from '@test/unit';
import { RouterTestingModule } from '@angular/router/testing';

export default <Meta>{
  title: 'Medicine/Transaction/List',
  component: MedicalTransactionComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        MedicalTransactionComponentModule,
        MockAnimalStoreModule,
        RouterTestingModule
      ]
    })
  ]
};

const Template: StoryFn<MedicalTransactionComponent> = (
  args: MedicalTransactionComponent
) => ({
  props: args
});

export const Default = <StoryFn<MedicalTransactionComponent>>Template.bind({});
Default.args = {
  transactions: [],
  medicineTypes: [...MedicineTestData.Medicine.SmallList],
  pageSize: 10,
  pageNumber: 0,
  recordCount: 0,
  units: [...UnitTestData.LongList]
};

export const LongList = <StoryFn<MedicalTransactionComponent>>Template.bind({});
LongList.args = {
  transactions: [...MedicineTestData.Transactions.SmallList],
  medicineTypes: [...MedicineTestData.Medicine.SmallList],
  pageSize: 10,
  pageNumber: 0,
  recordCount: MedicineTestData.Transactions.LongList.length,
  units: [...UnitTestData.LongList]
};

export const IsLoading = <StoryFn<MedicalTransactionComponent>>(
  Template.bind({})
);
IsLoading.args = {
  isLoadingTransactions: true,
  transactions: [],
  medicineTypes: [],
  pageSize: 10,
  pageNumber: 0,
  recordCount: 0,
  units: []
};
