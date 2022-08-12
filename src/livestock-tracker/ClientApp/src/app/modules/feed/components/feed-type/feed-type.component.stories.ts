import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import {
  FeedTypeComponent,
  FeedTypeComponentModule
} from './feed-type.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default <Meta>{
  title: 'Feed/Type',
  component: FeedTypeComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule, FeedTypeComponentModule]
    })
  ]
};

const Template: StoryFn<FeedTypeComponent> = (args: FeedTypeComponent) => ({
  props: args
});

export const Default: StoryFn<FeedTypeComponent> = Template.bind({});
Default.args = {
  feedTypes: [
    { id: 1, description: 'Wheat' },
    { id: 2, description: 'Maize' }
  ]
};
