import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LivestockService } from '@animal/services';
import { Animal, NullAnimal } from '@core/models';

@Component({
  selector: 'app-animal-select-display',
  template: `
    <div class="animal-select-display">
      <mat-icon [svgIcon]="svgIcon"></mat-icon>
      <span>{{ display }}</span>
    </div>
  `,
  styleUrls: ['./animal-select-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimalSelectDisplayComponent {
  @Input() public set animal(value: Animal) {
    this._animal = value;
  }
  public get animal(): Animal {
    return this._animal ?? NullAnimal.instance;
  }

  private _animal: Animal = NullAnimal.instance;

  constructor(private livestockService: LivestockService) {}

  public get display(): string {
    return `${this.animal.number} - ${this.animal.subspecies}`;
  }

  public get svgIcon(): string {
    return this.livestockService.getSvgIcon(this.animal);
  }
}
