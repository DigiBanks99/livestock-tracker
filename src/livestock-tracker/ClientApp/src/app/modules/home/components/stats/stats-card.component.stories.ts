import {
  Meta,
  moduleMetadata,
  Story
} from '@storybook/angular';

import {
  StatsCardComponent,
  StatsCardComponentModule
} from './stats-card.component';

export default <Meta>{
  title: 'Home/Stats/Card',
  component: StatsCardComponent,
  decorators: [
    moduleMetadata({
      imports: [StatsCardComponentModule]
    })
  ]
};

export const Default: Story = () => ({
  template: `<app-stats-card>
  <span description>Some stat</span>
  123
  </app-stats-card>`
});

export const Weight: Story = () => ({
  template: `<app-stats-card>
  <span description>Weight (Avg)</span>
  63.57 kg
  </app-stats-card>`
});
