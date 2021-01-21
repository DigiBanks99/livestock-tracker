import { LoaderModule } from '@shared/components/loader/loader.module';
import { moduleMetadata } from '@storybook/angular';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/angular/types-6-0';

import { LoaderComponent } from './loader.component';

const meta: Meta = {
  title: 'Shared/Loader',
  component: LoaderComponent,
  decorators: [
    moduleMetadata({
      imports: [LoaderModule]
    })
  ]
};

export default meta;

const Template: Story<LoaderComponent> = (args: LoaderComponent) => ({
  component: LoaderComponent,
  props: args
});

export const Default = Template.bind({});
