import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

import Button from './button.component';
import Header from './header.component';
import * as HeaderStories from './Header.stories';
import Page from './page.component';

export default <Meta>{
  title: 'Example/Page',
  component: Header,
  decorators: [
    moduleMetadata({
      declarations: [Button, Header],
      imports: [CommonModule]
    })
  ]
};

const Template: Story<Page> = (args: Page) => ({
  component: Page,
  props: args
});

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args
};
