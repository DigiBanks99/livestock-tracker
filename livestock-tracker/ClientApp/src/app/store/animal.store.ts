import { AnimalState } from './animalState.model';

export class AnimalStore {
  private initalState: AnimalState;

  constructor() {
    this.initalState = new AnimalState();
  }
}
