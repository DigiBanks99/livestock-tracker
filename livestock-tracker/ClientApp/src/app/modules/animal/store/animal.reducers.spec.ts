import { actions, SelectAnimalAction } from '@animal/store/animal.actions';
import { AnimalType, Livestock } from '@core/models';
import { AnimalState } from '@core/store';

import {
  animalsReducer,
  initialState as animalInitialState
} from './animal.reducers';

describe('animals reducer', () => {
  let initialState: AnimalState;

  beforeEach(() => {
    initialState = {
      ...animalInitialState,
      entities: { ...animalInitialState.entities },
      error: { ...animalInitialState.error },
      ids: (animalInitialState.ids || []).slice()
    };
  });

  it('should add another animal to the list when action is of type ADD_ANIMAL', () => {
    const animal1 = new Livestock(
      1,
      AnimalType.Cattle,
      'fries',
      1,
      new Date(),
      new Date(),
      100,
      0,
      120,
      1
    );
    const addAnimalTask1 = actions.apiAddItem(animal1);
    const state1 = animalsReducer(initialState, addAnimalTask1);
    expect(state1).not.toBe(null);
    expect(state1.entities[1]).toBeDefined();
    expect(state1.entities[1].id).toBe(animal1.id);
    expect(state1.entities[1].number).toBe(animal1.number);
    expect(state1.entities[1].arrivalWeight).toBe(animal1.arrivalWeight);
    expect(state1.entities[1].type).toBe(AnimalType.Cattle);

    const animal2 = new Livestock(
      2,
      AnimalType.Chicken,
      'black',
      2,
      new Date(),
      new Date(),
      20,
      0,
      1,
      2
    );
    const addAnimalTask2 = actions.apiAddItem(animal2);

    const state2 = animalsReducer(state1, addAnimalTask2);
    expect(state2).not.toBe(null);
    expect(state2.entities[1]).toBeDefined();
    expect(state2.entities[1].id).toBe(animal1.id);
    expect(state2.entities[1].number).toBe(animal1.number);
    expect(state2.entities[1].arrivalWeight).toBe(animal1.arrivalWeight);
    expect(state2.entities[1].type).toBe(AnimalType.Cattle);

    expect(state2.entities[2]).toBeDefined();
    expect(state2.entities[2].id).toBe(animal2.id);
    expect(state2.entities[2].number).toBe(animal2.number);
    expect(state2.entities[2].arrivalWeight).toBe(animal2.arrivalWeight);
    expect(state2.entities[2].type).toBe(AnimalType.Chicken);

    const animal3 = new Livestock(
      3,
      AnimalType.Pig,
      'fat',
      3,
      new Date(),
      new Date(),
      200,
      0,
      200,
      3
    );
    const addAnimalTask3 = actions.apiAddItem(animal3);

    const state3 = animalsReducer(state2, addAnimalTask3);
    expect(state3).not.toBe(null);
    expect(state3.entities[1]).toBeDefined();
    expect(state3.entities[1].id).toBe(animal1.id);
    expect(state3.entities[1].number).toBe(animal1.number);
    expect(state3.entities[1].arrivalWeight).toBe(animal1.arrivalWeight);
    expect(state3.entities[1].type).toBe(AnimalType.Cattle);

    expect(state3.entities[2]).toBeDefined();
    expect(state3.entities[2].id).toBe(animal2.id);
    expect(state3.entities[2].number).toBe(animal2.number);
    expect(state3.entities[2].arrivalWeight).toBe(animal2.arrivalWeight);
    expect(state3.entities[2].type).toBe(AnimalType.Chicken);

    expect(state3.entities[3]).toBeDefined();
    expect(state3.entities[3].id).toBe(animal3.id);
    expect(state3.entities[3].number).toBe(animal3.number);
    expect(state3.entities[3].arrivalWeight).toBe(animal3.arrivalWeight);
    expect(state3.entities[3].type).toBe(AnimalType.Pig);
  });

  it('should remove the animal with the provided key if the action is of type REMOVE_ANIMAL_SUCCESS', () => {
    const animal1 = new Livestock(
      1,
      AnimalType.Cattle,
      'fries',
      1,
      new Date(),
      new Date(),
      100,
      0,
      120,
      1
    );
    const addAnimalTask1 = actions.apiAddItem(animal1);
    const state1 = animalsReducer(initialState, addAnimalTask1);

    const animal2 = new Livestock(
      2,
      AnimalType.Chicken,
      'black',
      2,
      new Date(),
      new Date(),
      20,
      0,
      1,
      2
    );
    const addAnimalTask2 = actions.apiAddItem(animal2);
    const state2 = animalsReducer(state1, addAnimalTask2);

    const animal3 = new Livestock(
      3,
      AnimalType.Pig,
      'fat',
      3,
      new Date(),
      new Date(),
      200,
      0,
      200,
      3
    );
    const addAnimalTask3 = actions.apiAddItem(animal3);
    const state3 = animalsReducer(state2, addAnimalTask3);

    const removeAnimal2 = actions.apiDeleteItem(2);
    const state4 = animalsReducer(state3, removeAnimal2);
    expect(state4.entities[2]).toBeUndefined();
    expect(state4.entities[1]).toBeDefined();
    expect(state4.entities[3]).toBeDefined();

    const removeAnimal1 = actions.apiDeleteItem(1);
    removeAnimal1.payload = 1;
    const state5 = animalsReducer(state4, removeAnimal1);
    expect(state5.entities[2]).toBeUndefined();
    expect(state5.entities[1]).toBeUndefined();
    expect(state5.entities[3]).toBeDefined();

    const removeAnimal3 = actions.apiDeleteItem(3);
    const state6 = animalsReducer(state5, removeAnimal3);
    expect(state6.entities[2]).toBeUndefined();
    expect(state6.entities[1]).toBeUndefined();
    expect(state6.entities[3]).toBeUndefined();
  });

  it('should set selectedAnimal equal to the key of the action object when the type is of SELECT_ANIMAL', () => {
    expect(initialState.selectedId).toEqual(null);

    const animal1 = new Livestock(
      1,
      AnimalType.Cattle,
      'fries',
      1,
      new Date(),
      new Date(),
      100,
      0,
      120,
      1
    );
    const addAnimalTask1 = actions.apiAddItem(animal1);
    const state1 = animalsReducer(initialState, addAnimalTask1);

    const animal2 = new Livestock(
      2,
      AnimalType.Chicken,
      'black',
      2,
      new Date(),
      new Date(),
      20,
      0,
      1,
      2
    );
    const addAnimalTask2 = actions.apiAddItem(animal2);
    const state2 = animalsReducer(state1, addAnimalTask2);

    const animal3 = new Livestock(
      3,
      AnimalType.Pig,
      'fat',
      3,
      new Date(),
      new Date(),
      200,
      0,
      200,
      3
    );
    const addAnimalTask3 = actions.apiAddItem(animal3);
    const state3 = animalsReducer(state2, addAnimalTask3);

    const selectAnimal2 = new SelectAnimalAction(2);
    const state4 = animalsReducer(state3, selectAnimal2);
    expect(state4.selectedId).toEqual(2);

    const selectAnimal3 = new SelectAnimalAction(3);
    const state5 = animalsReducer(state4, selectAnimal3);
    expect(state5.selectedId).toEqual(3);
  });

  it('should clear animals and set them to the key value object matching array passed in if the action type is SET_ANIMALS', () => {
    const animal1 = new Livestock(
      1,
      AnimalType.Cattle,
      'fries',
      1,
      new Date(),
      new Date(),
      100,
      0,
      120,
      1
    );
    const animal2 = new Livestock(
      2,
      AnimalType.Chicken,
      'black',
      2,
      new Date(),
      new Date(),
      20,
      0,
      1,
      2
    );
    const animal3 = new Livestock(
      3,
      AnimalType.Pig,
      'fat',
      3,
      new Date(),
      new Date(),
      200,
      0,
      200,
      3
    );
    const setAnimals1 = actions.apiFetchItems({
      data: [animal1, animal2, animal3],
      pageSize: 10,
      currentPage: 0,
      pageCount: 1,
      totalRecordCount: 3
    });
    const state1 = animalsReducer(initialState, setAnimals1);
    expect(state1.entities).toBeDefined();
    expect(state1.entities).not.toBeNull();
    expect(state1.entities[1]).toBeDefined();
    expect(state1.entities[2]).toBeDefined();
    expect(state1.entities[3]).toBeDefined();
    expect(state1.entities[1].type).toBe(AnimalType.Cattle);
    expect(state1.entities[2].type).toBe(AnimalType.Chicken);
    expect(state1.entities[3].type).toBe(AnimalType.Pig);
  });
});
