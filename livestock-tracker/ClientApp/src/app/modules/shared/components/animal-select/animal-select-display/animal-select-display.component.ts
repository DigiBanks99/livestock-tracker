import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Animal, NullAnimal } from '@core/models';
import { SvgService } from '@svg/services';

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
    if (!value) {
      this._animal = value;
    }
  }
  public get animal(): Animal {
    return this._animal;
  }

  private _animal: Animal = { ...new NullAnimal() };

  constructor(private svgService: SvgService) {}

  public get display(): string {
    return `${this.animal.number} - ${this.animal.subspecies}`;
  }

  public get svgIcon(): string {
    return this.svgService.getSvgIcon(this.animal);
  }
}
