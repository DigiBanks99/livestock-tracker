import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AnimalType } from '@core/models';
import { SvgService } from '@svg/services';

@Component({
  selector: 'app-animal-type-select-display',
  template: ` <div class="animal-select-display">
    <mat-icon [svgIcon]="getIcon(value)"></mat-icon>
    <span>{{ value >= 0 ? AnimalTypes[value] : '' }}</span>
  </div>`,
  styleUrls: ['./animal-type-select-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimalTypeSelectDisplayComponent {
  @Input() public value: AnimalType | null = null;

  public AnimalTypes = AnimalType;

  constructor(private svgService: SvgService) {}

  public getIcon(animalType: AnimalType): string {
    return this.svgService.getSvgIconByType(animalType);
  }
}
