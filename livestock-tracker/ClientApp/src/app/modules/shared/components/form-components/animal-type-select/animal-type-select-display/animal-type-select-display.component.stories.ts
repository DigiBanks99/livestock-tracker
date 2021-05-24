import { MatIconModule } from '@angular/material/icon';
import { AnimalType } from '@core/models';
import { AnimalTypeSelectDisplayComponent } from '@shared/components/form-components/animal-type-select/animal-type-select-display/animal-type-select-display.component';
import { moduleMetadata, Story } from '@storybook/angular';
import { SvgProviderModule } from '@svg/svg-provider.module';

export default {
  title: 'Forms/Animal Type Select/Display',
  component: AnimalTypeSelectDisplayComponent,
  decorators: [
    moduleMetadata({
      declarations: [AnimalTypeSelectDisplayComponent],
      imports: [MatIconModule, SvgProviderModule]
    })
  ]
};

const Template: Story<AnimalTypeSelectDisplayComponent> = (
  args: AnimalTypeSelectDisplayComponent
) => ({
  component: AnimalTypeSelectDisplayComponent,
  props: args
});

export const Empty = Template.bind({});
export const WithValue = Template.bind({});
WithValue.args = {
  value: AnimalType.Sheep
};
