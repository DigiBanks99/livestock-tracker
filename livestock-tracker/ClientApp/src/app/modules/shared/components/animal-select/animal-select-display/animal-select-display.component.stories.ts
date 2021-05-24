import { TestData } from 'test/modules/animal';

import { AnimalSelectModule } from '@shared/components';
import { AnimalSelectDisplayComponent } from '@shared/components/animal-select/animal-select-display/animal-select-display.component';
import { moduleMetadata, Story } from '@storybook/angular';

export default {
  title: 'Shared/Animal Select/Display',
  decorators: [
    moduleMetadata({
      imports: [AnimalSelectModule]
    })
  ]
};

const Template: Story<AnimalSelectDisplayComponent> = (
  args: AnimalSelectDisplayComponent
) => ({
  component: AnimalSelectDisplayComponent,
  props: args
});

export const Empty = Template.bind({});
export const Short = Template.bind({});
Short.args = {
  animal: TestData.ShortSubspecies
};

export const Long = Template.bind({});
Long.args = {
  animal: TestData.LongSubspecies
};
