import { Livestock } from '../livestock/livestock.model';

export class AnimalState {
  constructor() {
    this.selectedAnimal = undefined;
    this.animals = [];
  }

  public selectedAnimal: Livestock;
  public animals: Livestock[];
}
