import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MedicineTypeComponent,
  MedicineTypeComponentModule
} from './medicine-type.component';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { MedicineTestData } from '@test/medical';

export default <Meta>{
  title: 'Medicine/Type',
  component: MedicineTypeComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule, MedicineTypeComponentModule]
    })
  ]
};

const Template: StoryFn<MedicineTypeComponent> = (
  args: MedicineTypeComponent
) => ({
  props: args
});

export const Default: StoryFn<MedicineTypeComponent> = Template.bind({});
Default.args = {
  medicineTypes: MedicineTestData.Medicine.LongList.slice(0, 10),
  pageSize: 10,
  pageNumber: 0,
  recordCount: MedicineTestData.Medicine.LongList.length
};
