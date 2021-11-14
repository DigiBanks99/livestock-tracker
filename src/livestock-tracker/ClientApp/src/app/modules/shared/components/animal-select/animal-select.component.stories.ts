import { TestData } from 'test/modules/animal';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimalSelectComponent, AnimalSelectModule } from '@shared/components';
import { moduleMetadata, Story } from '@storybook/angular';

export default {
  title: 'Shared/Animal Select',
  component: AnimalSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [AnimalSelectModule, BrowserAnimationsModule]
    })
  ]
};

const Template: Story<AnimalSelectComponent> = (
  args: AnimalSelectComponent
) => ({
  component: AnimalSelectComponent,
  props: args
});

export const Empty = Template.bind({});
export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  animals: TestData.ShortAnimalList
};
export const ShortList = Template.bind({});
ShortList.args = {
  animals: TestData.ShortAnimalList
};
export const LongList = Template.bind({});
LongList.args = {
  animals: TestData.LongAnimalList
};
export const WithValue = Template.bind({});
WithValue.args = {
  animals: TestData.ShortAnimalList,
  animal: TestData.ShortAnimalList[1]
};
