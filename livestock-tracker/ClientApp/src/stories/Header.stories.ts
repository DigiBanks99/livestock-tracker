import { CommonModule } from '@angular/common';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

import Button from './button.component';
import Header from './header.component';

export default <Meta>{
  title: 'Example/Header',
  component: Header,
  decorators: [
    moduleMetadata({
      declarations: [Button],
      imports: [CommonModule]
    })
  ]
};

const Template: Story<Header> = (args: Header) => ({
  component: Header,
  props: args
});

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {}
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
