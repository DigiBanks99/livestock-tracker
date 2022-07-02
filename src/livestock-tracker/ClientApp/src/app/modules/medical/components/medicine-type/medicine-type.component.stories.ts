import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MedicineTypeComponent,
  MedicineTypeComponentModule
} from '@medical/components/medicine-type/medicine-type.component';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

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
    medicineTypes: [
      {
        description: 'Painkillers',
        id: 1
      },
      {
        description: 'Antibiotics',
        id: 2
      }
    ]
  }
});
