import { TestData } from 'test/modules/animal';

import { AnimalSelectComponent } from '@shared/components/animal-select/animal-select.component';
import { AnimalSelectModule } from '@shared/components/animal-select/animal-select.module';
import { moduleMetadata, Story } from '@storybook/angular';

export default {
  title: 'Shared/Animal Select',
  decorators: [
    moduleMetadata({
      imports: [AnimalSelectModule]
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
