import { LoaderModule } from '@shared/components/loader/loader.module';
import { moduleMetadata } from '@storybook/angular';

import { LoaderComponent } from './loader.component';

export default {
  title: 'Shared/Loader',
  component: LoaderComponent,
  decorators: [
    moduleMetadata({
      imports: [LoaderModule]
    })
  ]
};

const Template = (args: LoaderComponent) => ({
  component: LoaderComponent,
  props: args
});

export const Default = Template.bind({});
