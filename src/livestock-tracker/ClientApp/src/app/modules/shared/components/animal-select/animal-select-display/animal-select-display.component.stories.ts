import { TestData } from 'test/modules/animal';

import { moduleMetadata, Story } from '@storybook/angular';
import { SvgProviderModule } from '@svg/svg-provider.module';

import { AnimalSelectDisplayComponent } from './animal-select-display.component';

export default {
  title: 'Shared/Animal Select/Display',
  decorators: [
    moduleMetadata({
      declarations: [AnimalSelectDisplayComponent],
      imports: [SvgProviderModule]
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
