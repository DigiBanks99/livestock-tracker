import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Animal, NullAnimal } from '@core/models';

@Component({
  selector: 'app-animal-select',
  templateUrl: './animal-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimalSelectComponent {
  @Input() public set animal(value: Animal) {
    if (value != null) {
      this._animal = value;
    }
  }
  public get animal(): Animal {
    return this._animal;
  }
  @Input() public animals: Animal[];
  @Input() public disabled: boolean;
  @Output() public readonly animalChanged = new EventEmitter<number>();

  private _animal: Animal = NullAnimal.instance;

  public onSelectionChanged(id: number): void {
    this.animal =
      this.animals.find(
        (animalOption: Animal): boolean => +animalOption.id === id
      ) ?? null;
    this.animalChanged.emit(id);
  }
}
