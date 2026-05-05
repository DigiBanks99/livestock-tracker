import { KraalStats } from '@animal/models';
import {
  Meta,
  moduleMetadata,
  StoryFn
} from '@storybook/angular';
import { MockAnimalStoreModule } from '@test/animal';

import {
  KraalStatsComponent,
  KraalStatsComponentModule
} from './kraal-stats.component';

export default <Meta>{
  title: 'Home/Widgets/Stats',
  component: KraalStatsComponent,
  decorators: [
    moduleMetadata({
      imports: [KraalStatsComponentModule, MockAnimalStoreModule]
    })
  ]
};

const standardStats = new KraalStats();
standardStats.animalCount = 50;
standardStats.averageAnimalCost = 200;
standardStats.averageSellPrice = 534.22;
standardStats.averageWeight = 63.75;
standardStats.deathRate = 0.7;

const Template: StoryFn<KraalStatsComponent> = (args: KraalStatsComponent) => ({
  props: args
});

export const Default: StoryFn<KraalStatsComponent> = Template.bind({});
export const StandardValues: StoryFn<KraalStatsComponent> = Template.bind({});
StandardValues.args = {
  stats: standardStats
};
