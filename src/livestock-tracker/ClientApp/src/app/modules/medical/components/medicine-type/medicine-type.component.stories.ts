import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MedicineTypeComponent,
  MedicineTypeComponentModule
} from '@medical/components/medicine-type/medicine-type.component';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { MedicineTestData } from '@test/medical';

export default <Meta>{
  title: 'Medicine/Type/List',
  component: MedicineTypeComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule, MedicineTypeComponentModule],
      providers: [
        {
          provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
          useValue: { appearance: 'outline' }
        }
      ]
    })
  ]
};

export const Default: StoryFn<MedicineTypeComponent> = (
  args: MedicineTypeComponent
) => ({
  props: <MedicineTypeComponent>{
    medicineTypes: MedicineTestData.Medicine.LongList.slice(0, 10),
    pageSize: 10,
    pageNumber: 0,
    recordCount: MedicineTestData.Medicine.LongList.length
  }
});
