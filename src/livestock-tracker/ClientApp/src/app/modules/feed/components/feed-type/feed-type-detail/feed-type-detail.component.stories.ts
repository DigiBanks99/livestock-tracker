import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import {
  FeedTypeDetailComponent,
  FeedTypeDetailComponentModule
} from '@feed/components';

export default <Meta>{
  title: 'Feed/Type/Detail',
  component: FeedTypeDetailComponent,
  decorators: [
    moduleMetadata({
      imports: [FeedTypeDetailComponentModule]
    })
  ]
};

const Template: StoryFn<FeedTypeDetailComponent> = (
  args: FeedTypeDetailComponent
) => ({
  props: args
});

export const Default: StoryFn<FeedTypeDetailComponent> = Template.bind({});
Default.args = {
  feedType: {
    id: 7,
    description: 'Maize'
  }
};
